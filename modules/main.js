import { createCatalogElement } from './catalog.js';
import { orderBooks } from './order-books.js'

//  Create Catalog Element:
function createMainElement(confirmOrder) {
    const createDiv = (className,) => {
        let elem = document.createElement('div');
        if (!className) return elem;
        elem.className = className;
        return elem;
    };
    const fragment = new DocumentFragment();

    const divMain = document.createElement('main');
    divMain.id = 'main';

    const divCatalogContainer = createDiv('container');

    divCatalogContainer.append(
        createCatalogElement(),
        orderBooks(confirmOrder)
    );
    fragment.appendChild(divCatalogContainer);

    divMain.appendChild(fragment);
    return divMain;
}

export { createMainElement };