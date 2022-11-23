// Cached books
var books = [];

function fetchAndCacheBooks(whenFetchedCallback) {
    // prevents heavy operation of fetching books
    if(books.length > 0) {
        whenFetchedCallback(books);
    }

    fetch('./data/books.json')
        .then(response => {
            return response.json();
        })
        .then(booksRespopnse => {
            books = booksRespopnse;
            whenFetchedCallback(books);
        });
}

// * function to find a book by its id
// * should be called after fetchBooks!
function findBook(id) {
    return books.find(book => book.id === id);
}

export {fetchAndCacheBooks, findBook}
