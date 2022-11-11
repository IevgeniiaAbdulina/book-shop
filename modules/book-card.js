// Book Card Element
// // Event called on Buy Button Click event and callback parametr is a book element

const createBookCard = (book, callback) => {
    let divBookCard = document.createElement('div');
    divBookCard.className = 'book-card';

    let divBookImage = document.createElement('img');
    divBookImage.className = 'book-img';
    divBookImage.setAttribute('src', book.imageLink);
    divBookImage.setAttribute('alt', 'book image');

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

    let divTextContainer = document.createElement('div');
    divTextContainer.className = 'text-container';
    divTextContainer.append(divAuthor, divTitle, divBuyButton);

    divBookCard.append(divBookImage, divTextContainer)

    return divBookCard;
}

export { createBookCard };