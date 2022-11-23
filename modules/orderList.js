import { findBook } from './bookProvider.js';
import { showEmptyMessage } from './order-books.js'

function onRemoveBookFromOrderList(orderList) {
    if(orderList.length === 0) {
        showEmptyMessage();
    }
}

function createOrderList(orderList, removeItem) {
    let fragment = document.createDocumentFragment();
    let parent = document.getElementById('droptarget');
    let count = 0;

    const removeAllChildNodes = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // Count the same bought books:
    const orderListMap = new Map();

    for (let item of orderList) {
        if(!orderListMap.has(item.id)) {
            orderListMap.set(item.id, 1);
        } else {
            let value = orderListMap.get(item.id);
            if(value) {
                value++;
                orderListMap.set(item.id, value);
            }
        }
    };

    removeAllChildNodes(parent);

    for (let elem of orderListMap) {
        let book = findBook(elem[0]);

        const bookCard = document.createElement('div');
            bookCard.className = 'ordered-book-card';

            let img = document.createElement('img');
            img.className = 'ordered-book-img';
            img.src = book.imageLink;
            img.alt = 'book image';

            let textContainer = document.createElement('div');
            textContainer.className = 'ordered-book-text-container';

            let author = document.createElement('p');
            author.className = 'ordered-book-author';
            author.innerText = book.author;

            let title = document.createElement('h3');
            title.className = 'ordered-book-title';
            title.innerText = book.title;

            let price = document.createElement('p');
            price.className = 'ordered-book-price';

            count = elem[1];
            price.innerText = `Price: $ ${book.price} x ${count}`;

            let removeButton = document.createElement('div');
            removeButton.className = 'remove-button';
            removeButton.id = 'remove';
            removeButton.innerHTML = '<span class="material-symbols-outlined">close</span>';
            removeButton.addEventListener('click', event => {
                removeItem(book.id, bookCard);
            });

            textContainer.append(
                author,
                title,
                price
            );
            bookCard.append(
                img,
                textContainer,
                removeButton
            );
            fragment.appendChild(bookCard);
    }

    return parent.appendChild(fragment);
}

export { createOrderList, onRemoveBookFromOrderList };