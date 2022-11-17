function createCatalogElement() {
    const catalogWrapper = document.createElement('div');
    catalogWrapper.className = 'catalog-wrapper';

    const catalogHeader = document.createElement('h2');
    catalogHeader.className = 'catalog-header';
    catalogHeader.innerText = 'Book catalog';

    const catalogContent = document.createElement('div');
    catalogContent.className = 'catalog-content';
    catalogContent.id = 'catalog';

    catalogWrapper.append(catalogHeader, catalogContent)

    return catalogWrapper;
}

export {createCatalogElement};