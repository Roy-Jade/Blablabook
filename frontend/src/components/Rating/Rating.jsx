export default function Rating({ rate, onClick, editable = false }) {
    const handleStarClick = (starIndex) => {
        if (editable && onClick) {
            onClick(starIndex);
        }
    };

    return (
        <div style={{ cursor: editable ? 'pointer' : 'default' }}>
            {[1, 2, 3, 4, 5].map(starIndex => (
                <span
                    key={starIndex}
                    onClick={() => handleStarClick(starIndex)}
                    style={{
                        fontSize: '1.2em',
                        userSelect: 'none',
                        cursor: editable ? 'pointer' : 'default'
                    }}
                >
                    {starIndex <= rate ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
}