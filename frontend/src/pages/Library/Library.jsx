import BookMinis from '../../components/BookMinis/BookMinis';
import Sort from '../../components/Sort/Sort';
import './Library.scss';

export default function Library() {
    return(
        <>
            <h1>Bibliothèque</h1>
            <div className='library'>
                <Sort/>
                <div className='library__book-list'>
                    <BookMinis book="9782266114042" />
                    <BookMinis book="9782266114042" />
                    <BookMinis book="9782266114042" />
                </div>
            </div>
        </>
    )
}