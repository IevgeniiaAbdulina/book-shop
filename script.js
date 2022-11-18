import { fetchAndCacheBooks, findBook } from './modules/bookProvider.js';
import { createHeaderElement } from './modules/header.js';
import { createMainElement } from './modules/main.js';
import { createFooterElements } from './modules/footer.js';
import { createBookCard } from './modules/book-card.js';
import { bookPopup } from './modules/bookPopup.js';
import { createOrderList } from './modules/orderList.js';
import { orderBooks } from './modules/order-books.js';

// Object with bought books:
var shoppingBag = {
    booksInBag: [],
}

// DRAG-AND-DROP EVENTS:
function allowDrop(event) {
    event.preventDefault();
}

function dragEnter(event) {
    let targetElement = document.querySelector('.bag-button');
    targetElement.classList.add('over');
}

function drag(event, item) {
    event.target.style.opacity = '0.4';
    event.dataTransfer.setData('Item', item.id);
}

function dragend(event) {
    event.target.style.opacity = '1';

    let targetElement = document.querySelector('.bag-button');
    targetElement.classList.remove('over');
}

function drop(event) {
    event.preventDefault();
    let bookId = event.dataTransfer.getData('Item');
    buyBook(bookId);
}
// ----------------------------------------------------------

// Create elements when the whole page has loaded:
window.onload = () => {
    const fragment = new DocumentFragment();
    fragment.append(
        createHeaderElement(),
        createMainElement(confirmOrder),
        createFooterElements()
    );
    document.body.prepend(fragment);

    const catalogContainer = document.getElementById('catalog');
    fetchBooks(catalogContainer);
}
// ----------------------------------------------------------

// Get books from Cache:
const fetchBooks = (parentDiv) => {
    fetchAndCacheBooks((books) => {
        const fragment = new DocumentFragment();
        books.map(book => {
            return fragment.append(createBookCard(book, buyBook, showMore));
        });
        parentDiv.append(fragment);

        // DRAG-AND-DROP EVENT LISTENERS:
        books.map(item => {
            let selectedItem = document.getElementById(item.id);
            selectedItem.addEventListener('dragstart', (event) => drag(event, item));
            selectedItem.addEventListener('dragend', dragend);
        })

        let targetElement = document.getElementById('droptarget');
            targetElement.addEventListener('dragover', allowDrop);
            targetElement.addEventListener('dragenter', dragEnter);
            targetElement.addEventListener('dragend', dragend);
            targetElement.addEventListener('drop', drop);
    });
}

const buyBook = (bookId) => {
    let book = findBook(bookId);
    if(!book) {
        alert('this item can\'t be found:', bookId);
        return;
    };

    shoppingBag.booksInBag.push(book);

    // Here the book appears in the bag with shorten data:
    createOrderList(shoppingBag.booksInBag, removeItem);

    // total sum is updated:
    totalSum();
}

// remove book from the bag by the appropriate button:
const removeItem = (id, bookCard) => {
    let parent = document.getElementById('droptarget');

    let filteredList = shoppingBag.booksInBag.filter(el => el.id !== id);
    shoppingBag.booksInBag = filteredList;

    // total sum is updated:
    totalSum();
    parent.removeChild(bookCard);
}

const totalSum = () => {
    let shoppingList = shoppingBag.booksInBag;
    let totalSum = 0;

    for (let item of shoppingList) {
        totalSum += item.price;
    }

    let sum = document.getElementById('total');
    sum.innerText = `Total: $ ${totalSum}`;
}

// Confirm an order:
// * When user click on Confirm order he appears in the Order page ( with form )
const confirmOrder = () => {
    console.log(' CoNFIRM ORDER');
    
}

// POP-UP MODAL WINDOW
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