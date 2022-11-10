import { createHeaderElement } from './modules/header.js';
import { books } from './data/test-books.js';
import { createBookCard } from './modules/book-card.js';
import { createCatalogElement } from './modules/catalog.js';
import { createFooterElements } from './modules/footer.js';

// Create elements when the whole page has loaded:
window.onload = () => {
    let container = document.querySelector('#page');
    const divMain = document.createElement('main');

    container.before(divMain);
    divMain.before(createHeaderElement());
    divMain.after(createFooterElements());

    let booksCatalog = createCatalogElement(divMain);

    fetchBooks(booksCatalog);
}

// Add element to parent element:
const fetchBooks = (parentDiv) => {
    const bookDivs = books.map(book => {
        return createBookCard(book);
    });

    parentDiv.append(...bookDivs);
}