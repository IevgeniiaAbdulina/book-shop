// Test json data with books information
const books = [
    {
        title: "JavaScript: The Good Parts: The Good Parts",
        author: 'Douglas Crockford',
        imageLink: 'https://d1b14unh5d6w7g.cloudfront.net/0596517742.01.S001.LXXXXXXX.jpg?Expires=1668162422&Signature=RREeJmwGcI3STAXkIN0ecAVoE-nj63fkoKRxYZu8PDdCQHs6gUMv8udLZM7M~SOm5SPipZHrMxwln0MqJ3q3lgE~fCpuxi9EfgUt4vjKAndAUHV9G2ytSJqVz5tXKqMsOZ7BSSeoHU~tE0tithbqLU1Z03t2kusxTTMCKPdjL2w_&Key-Pair-Id=APKAIUO27P366FGALUMQ',
        price: 30
    },
    {
        title: "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript",
        author: 'Bradley Meck Alex Young and Mike Cantelon',
        imageLink: 'https://d1b14unh5d6w7g.cloudfront.net/0321812182.01.S001.LXXXXXXX.jpg?Expires=1668161926&Signature=e8Z3ZMNkakH~-M~0zzx2iFMPj6X0KtWlsqYXs-uBZEz3MMhgixMuUIfmTbVeia3yW0nCo2FO8ynj43azbR0SUem2uX7L7LVR~kKNIYeEW41Xg5WcHjHEw5WTAXD0TL6bSGHpl32MpqTwhl7huyxi9RvBhdREvB85eSnU4Hmx8MY_&Key-Pair-Id=APKAIUO27P366FGALUMQ',
        price: 44

    },
    {
        title: "JavaScript: The Definitive Guide",
        author: 'David Flanagan',
        imageLink: 'https://d1b14unh5d6w7g.cloudfront.net/1491950293.01.S001.LXXXXXXX.jpg?Expires=1668161997&Signature=USbHO4ZAES7-r1ytNbt2vx8P4PmT-W4al2U9zs6mBcOaa87qTJOuF9nmHlefwqDvH7CrafM0jw2YKogRkAtqypYhPPi8uz03-v70uzC2DVmIRw~2QWGLi24J5Q243TuJBb4Y5u5S8IUTlUK5PardV8fyCb9Uu-PEYkUzC53ofrE_&Key-Pair-Id=APKAIUO27P366FGALUMQ',
        price: 120
    }
];

// Create elements when the whole page has loaded:
window.onload = () => {
    let container = document.querySelector('#page');
    const divMain = document.createElement('main');

    container.before(divMain);
    divMain.before(createHeaderElement());

    let booksCatalog = createCatalogElement(divMain);

    fetchBooks(booksCatalog);
}

const createBook = (book) => {
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

    let divBuyButton = document.createElement('div');
    divBuyButton.className = 'buy-button';
    divBuyButton.innerHTML = `<p>Buy Button <span>$ ${book.price}</span></p>`;

    let divTextContainer = document.createElement('div');
    divTextContainer.className = 'text-container';
    divTextContainer.append(divAuthor, divTitle, divBuyButton);

    divBookCard.append(divBookImage, divTextContainer)

    return divBookCard;
}

// Add element to parent element:
const fetchBooks = (parentDiv) => {
    const bookDivs = books.map(book => {
        return createBook(book);
    });

    parentDiv.append(...bookDivs);
}

//  Create Main Element:
//  Returns parent for createBook()
function createCatalogElement(parent) {
    const divCatalogContainer = document.createElement('div');
    divCatalogContainer.className = 'catalog-container';

    const divCatalogNav = document.createElement('div');
    divCatalogNav.className = 'catalog-nav';

    const divCatalogContent = document.createElement('div');
    divCatalogContent.className = 'catalog-content';

    divCatalogContainer.append(divCatalogNav, divCatalogContent);
    parent.append(divCatalogContainer);

    return divCatalogContent;
}

// Create Header Element:
const createHeaderElement = () => {
    const tagHeader = document.createElement('header');

    const headerContainer = document.createElement('div');
    headerContainer.className = 'header-container';

    const headerTitle = document.createElement('h1');
    headerTitle.innerText = 'Welcome to amazing book shop';

    const divDivider = document.createElement('div');
    divDivider.className = 'header-divider';

    headerContainer.append(headerTitle, divDivider);
    tagHeader.appendChild(headerContainer);

    return tagHeader;
}