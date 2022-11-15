//  Create Catalog Element:
function createCatalogElement(parent, allowDrop, drop) {
    const createDiv = (className) => {
        let elem = document.createElement('div');
        if (!className) return elem;
        elem.className = className;
        return elem;
    };

    const divCatalogContainer = createDiv('catalog-container');
    const divCatalogNav = createDiv('catalog-nav');

    const bagButton = document.createElement('button');
    bagButton.className = 'bag-button';
    bagButton.id = 'gate';
    bagButton.setAttribute('ondragover', allowDrop);
    bagButton.setAttribute('ondrop', drop);

    divCatalogNav.append(bagButton);

    const bagText = createDiv('bag-text');
    bagText.innerHTML = '<p>My Books</p>';

    const bagIcon = document.createElement('img');
    bagIcon.setAttribute('src', '/assets/icons/basket-24.png');
    bagIcon.setAttribute('alt', 'bag icon');
    bagText.append(bagIcon);

    const booksCount = createDiv('books-count');

    bagButton.append(bagText, booksCount);

    const divCatalogContent = createDiv('catalog-content');
    divCatalogContent.id = 'catalog';

    divCatalogContainer.append(divCatalogNav, divCatalogContent);
    parent.append(divCatalogContainer);

    // bagButton.addEventListener('ondragover', allowDrop);
    // bagButton.addEventListener('ondrop', drop);

    return divCatalogContent;
}

export { createCatalogElement };