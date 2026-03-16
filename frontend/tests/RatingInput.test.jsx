import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingInput from '../src/components/RatingInput/RatingInput';

vi.mock('../src/api/api.js', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { userRate: null } }),
    patch: vi.fn().mockResolvedValue({ data: { message: 'OK' } })
  }
}));

import api from '../src/api/api.js';

describe('RatingInput', () => {
  const mockSetUserRate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('affiche cinq étoiles vides au rendu initial', () => {
    render(<RatingInput bookID={1} userRate={null} setUserRate={mockSetUserRate} />);
    const emptyStars = screen.getAllByText('☆');
    expect(emptyStars).toHaveLength(5);
  });

  it('affiche les étoiles pleines selon userRate', () => {
    render(<RatingInput bookID={1} userRate={3} setUserRate={mockSetUserRate} />);
    expect(screen.getAllByText('★')).toHaveLength(3);
    expect(screen.getAllByText('☆')).toHaveLength(2);
  });

  it('applique star-hovered au survol d\'une étoile', () => {
    render(<RatingInput bookID={1} userRate={null} setUserRate={mockSetUserRate} />);
    const labels = screen.getAllByRole('radio').map(input => 
      document.querySelector(`label[for="${input.id}"]`)
    );
    fireEvent.mouseEnter(labels[2]); // survol étoile 3
    expect(labels[0]).toHaveClass('star-hovered');
    expect(labels[1]).toHaveClass('star-hovered');
    expect(labels[2]).toHaveClass('star-hovered');
    expect(labels[3]).not.toHaveClass('star-hovered');
    expect(labels[4]).not.toHaveClass('star-hovered');
  });

  it('retire star-hovered quand la souris quitte le fieldset', () => {
    render(<RatingInput bookID={1} userRate={null} setUserRate={mockSetUserRate} />);
    const labels = screen.getAllByRole('radio').map(input =>
      document.querySelector(`label[for="${input.id}"]`)
    );
    const fieldset = screen.getByRole('group');
    fireEvent.mouseEnter(labels[2]);
    fireEvent.mouseLeave(fieldset);
    labels.forEach(label => expect(label).not.toHaveClass('star-hovered'));
  });

  it('appelle setUserRate et api.patch au clic sur une étoile', async () => {
    render(<RatingInput bookID={1} userRate={null} setUserRate={mockSetUserRate} />);
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[2]); // clic étoile 3
    expect(mockSetUserRate).toHaveBeenCalledWith(3);
    expect(api.patch).toHaveBeenCalledWith('/book/1/user-data', { field: 'rate', newData: 3 });
  });

  it('reset appelle setUserRate(null) et api.patch avec reset_rate', async () => {
    render(<RatingInput bookID={1} userRate={3} setUserRate={mockSetUserRate} />);
    const resetButton = screen.getByText('Réinitialise ta note');
    fireEvent.click(resetButton);
    expect(mockSetUserRate).toHaveBeenCalledWith(null);
    expect(api.patch).toHaveBeenCalledWith('/book/1/user-data', { field: 'reset_rate', newData: null });
  });
});