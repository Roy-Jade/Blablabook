

async function searchOLBooks(searchItem, searchQuery)  {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?${searchItem}=${searchQuery}&fields=key,title,author_name,isbn,first_publish_year&language=fre&limit=10`)
        if (!response.ok) {
            throw new Error(`Response status : ${response.status}`)
        }
        const result = await response.json()
        const books = []
        for (let i=0; i<result.docs.length; i++) {
            const isbn = result.docs[i]?.isbn?.find((element) => element.length === 13)
            if (!isbn) continue
            books.push({
                title : result.docs[i].title, 
                author: result.docs[i].author_name?.join(', ') ?? 'Auteur inconnu', 
                isbn : isbn, 
                publish_year : result.docs[i].first_publish_year
            })
        }
        return books
    } catch(error) {
        console.error(error.message)
        return []
    }
}

async function getOLBookData(isbn, author=null) {
    try {
        const fetchOlKeyPageNumberPublishDate = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
        if (!fetchOlKeyPageNumberPublishDate.ok) {
            throw new Error(`Fetch ol_key, page_number, publish_date response status : ${fetchOlKeyPageNumberPublishDate.status}`)
        }
        const fetchOlKeyPageNumberPublishDateResult = await fetchOlKeyPageNumberPublishDate.json();

        if (!fetchOlKeyPageNumberPublishDateResult.works?.[0]?.key) {
            throw new Error("Œuvre introuvable sur OpenLibrary");
        }

        const fetchTitleSummaryAuthorKey = await fetch(`https://openlibrary.org/${fetchOlKeyPageNumberPublishDateResult.works[0].key}.json`);
        if (!fetchTitleSummaryAuthorKey.ok) {
            throw new Error(`Fetch summary, author_key response status : ${fetchTitleSummaryAuthorKey.status}`)
        }
        const fetchTitleSummaryAuthorKeyResult = await fetchTitleSummaryAuthorKey.json();

        if (!author && fetchTitleSummaryAuthorKeyResult?.authors[0]?.author?.key) {
            const fetchAuthor = await fetch(`https://openlibrary.org${fetchTitleSummaryAuthorKeyResult.authors[0].author.key}.json`);
            if (!fetchAuthor.ok) {
                throw new Error(`Fetch author response status : ${fetchAuthor.status}`)
            }
            const fetchAuthorResult = await fetchAuthor.json();
            author = fetchAuthorResult.name ?? "Auteur inconnu";
        }

        const bookData = {
            title: fetchTitleSummaryAuthorKeyResult.title ?? null,
            author: author ?? "Auteur inconnu",
            summary: typeof fetchTitleSummaryAuthorKeyResult.description === 'string' 
                ? fetchTitleSummaryAuthorKeyResult.description 
                : fetchTitleSummaryAuthorKeyResult.description?.value ?? "Aucune description disponible",
            publish_date: fetchOlKeyPageNumberPublishDateResult?.publish_date ?? 0,
            page_number: fetchOlKeyPageNumberPublishDateResult?.number_of_pages ?? 0,
            isbn: isbn,
        }
        return bookData

    } catch(error) {
        console.error(error.message)
        return {}
    }
}

export {searchOLBooks, getOLBookData}