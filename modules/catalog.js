//  Create Catalog Element:
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

export { createCatalogElement };