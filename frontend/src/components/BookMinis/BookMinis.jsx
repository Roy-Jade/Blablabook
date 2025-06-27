import BookMini from './BookMini/BookMini';

export default function BookMini({books}) {
    return(
        <>
            {books.map((books) => <BookMini key={books.isbn} book={books}/>)}
            {/* <BookMini ISBN={book}/>
            <BookMini ISBN={book}/>
            <BookMini ISBN={book}/>
            <BookMini ISBN={book}/> */}
        </>
    )
}