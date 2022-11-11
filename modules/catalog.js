//  Create Catalog Element:
function createCatalogElement(parent) {
    const createDiv = (className) => {
        let elem = document.createElement('div');
        if (!className) return elem;
        elem.className = className;
        return elem;
    };

    const divCatalogContainer = createDiv('catalog-container');
    const divCatalogNav = createDiv('catalog-nav');
    const bagButton = createDiv('bag-button');

    divCatalogNav.append(bagButton);

    const bagText = createDiv('bag-text');
    bagText.innerHTML = '<p>My Books</p>';

    const bagIcon = document.createElement('img');
    bagIcon.setAttribute('src', '/assets/icons/basket-24.png');
    bagIcon.setAttribute('alt', 'bag icon');
    bagText.append(bagIcon);

    const booksCount = createDiv('books-count');
    booksCount.innerText = '12';
    bagButton.append(bagText, booksCount);

    const divCatalogContent = createDiv('catalog-content');

    divCatalogContainer.append(divCatalogNav, divCatalogContent);
    parent.append(divCatalogContainer);

    return divCatalogContent;
}

export { createCatalogElement };