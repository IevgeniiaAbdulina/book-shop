import { createHeaderElement } from './modules/header.js';
import { createBookCard } from './modules/book-card.js';
import { createCatalogElement } from './modules/catalog.js';
import { createFooterElements } from './modules/footer.js';

var shoppingBag = {
    booksInBag: [],
}

// Create elements when the whole page has loaded:
window.onload = () => {
    let container = document.querySelector('#page');
    const divMain = document.createElement('main');

    container.before(divMain);
    divMain.before(createHeaderElement());
    divMain.after(createFooterElements());

    let booksCatalog = createCatalogElement(divMain, shoppingBag);

    fetchBooks(booksCatalog);
}

// Add element to parent element:
const fetchBooks = (parentDiv) => {
    fetch('./data/books.json')
        .then(response => {
            return response.json();
        })
        .then(books => {
            const bookDivs = books.map(book => {
                return createBookCard(book, buyBook);
            });

            parentDiv.append(...bookDivs);
        });
}

//const booksInBag = [];
const buyBook = (book) => {
    shoppingBag.booksInBag.push(book);

    let shoppingList = shoppingBag.booksInBag.length;
    const booksCountNum = document.querySelector('.books-count');
    // create shopping bag count text:
    booksCountNum.innerText = `${shoppingList}`;
}