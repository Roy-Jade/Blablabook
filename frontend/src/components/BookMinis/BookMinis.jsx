import BookMini from './BookMini/BookMini';

export default function BookMinis({books, numberOfBooks}) {

    return(
        <>
            {books.map((book) => <BookMini key={book.isbn} book={book}/>).slice(0, numberOfBooks)}
        </>
    )
}