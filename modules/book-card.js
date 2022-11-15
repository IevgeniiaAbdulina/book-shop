// Book Card Element
// // Event called on Buy Button Click event and callback parametr is a book element

const createBookCard = (book, callback, showMore, drag) => {
    let divBookCard = document.createElement('div');
    divBookCard.className = 'book-card';

    let divBookImage = document.createElement('img');
    divBookImage.className = 'book-img';
    let idCard = Math.floor(Math.random()*100+1);
    divBookImage.id = idCard;
    divBookImage.setAttribute('src', book.imageLink);
    divBookImage.setAttribute('alt', 'book image');
    divBookImage.setAttribute('draggable', 'true');
    divBookImage.setAttribute('ondragstart', drag);

    let divTitle = document.createElement('div');
    divTitle.className = 'book-title';
    divTitle.innerHTML = `<h2>${book.title}</h2>`;

    let divAuthor = document.createElement('div');
    divAuthor.className = 'book-author';
    divAuthor.innerHTML = `<p>${book.author}</p>`;

    let divBuyButton = document.createElement('button');
    divBuyButton.className = 'buy-button';
    divBuyButton.innerHTML = `<p>Add to bag <span>$ ${book.price}</span></p>`;
    divBuyButton.addEventListener('click', event => callback(book));

    let showMoreButton = document.createElement('button');
    showMoreButton.className = 'info-button';
    showMoreButton.innerText = 'Show more';
    showMoreButton.addEventListener('click', (event) => showMore(book));

    let divTextContainer = document.createElement('div');
    divTextContainer.className = 'text-container';
    divTextContainer.append(divAuthor, divTitle, showMoreButton, divBuyButton);

    divBookCard.append(divBookImage, divTextContainer);

    divBookImage.addEventListener('ondragstart', drag);

    return divBookCard;
}

export { createBookCard };