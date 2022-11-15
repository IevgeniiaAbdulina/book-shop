import { createHeaderElement } from './modules/header.js';
import { createBookCard } from './modules/book-card.js';
import { createCatalogElement } from './modules/catalog.js';
import { createFooterElements } from './modules/footer.js';
import { bookPopup } from './modules/bookPopup.js';

var shoppingBag = {
    booksInBag: [],
}

function allowDrop(event) {
    console.log("on allowDrop event: ", event);
    // event.stopPropagation();
    event.preventDefault();
}

function drag(event) {
    console.log("on drag event: ", event.target.id);
    event.target.style.opacity = '0.4';
    event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    console.log("on drop event: ", event, data);
}

// Create elements when the whole page has loaded:
window.onload = () => {
    let container = document.querySelector('#page');
    const divMain = document.createElement('main');

    container.before(divMain);
    divMain.before(createHeaderElement());
    divMain.after(createFooterElements());

    let booksCatalog = createCatalogElement(divMain, shoppingBag, allowDrop, drop);

    fetchBooks(booksCatalog);
}

const fetchBooks = (parentDiv) => {
    fetch('./data/books.json')
        .then(response => {
            return response.json();
        })
        .then(books => {
            const bookDivs = books.map(book => {
                return createBookCard(book, buyBook, showMore, drag);
            });
            parentDiv.append(...bookDivs);
        })
        .then (() => {
            let imgs = document.querySelectorAll('.book-img');
            imgs.forEach(function (img) {
                img.addEventListener('dragstart', drag);
            });
        })
}

const buyBook = (book) => {
    shoppingBag.booksInBag.push(book);

    let shoppingList = shoppingBag.booksInBag.length;
    const booksCountNum = document.querySelector('.books-count');
    // create shopping bag count text:
    booksCountNum.innerText = `${shoppingList}`;
}

const hideModalWindowOnBlur = (event) => {
    if(event.target === event.currentTarget) {
        hideModalWindow();
    }
}

const hideModalWindow = () => {
    const modalWindowOverlay = document.getElementById('modal-overlay');
    modalWindowOverlay.style.display = 'none';
}

const showMore = (book) => {
    console.log('selected book:', book);
    bookPopup(book, hideModalWindow, hideModalWindowOnBlur);
    const modalWindowOverlay = document.getElementById('modal-overlay');
    modalWindowOverlay.style.display = 'flex';
}