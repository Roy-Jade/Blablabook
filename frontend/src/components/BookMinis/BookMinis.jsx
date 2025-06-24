import BookMini from './BookMini/BookMini';

export default function BookMini({book}) {
    return(
        <>
            <BookMini ISBN={book}/>
            <BookMini ISBN={book}/>
            <BookMini ISBN={book}/>
        </>
    )
}