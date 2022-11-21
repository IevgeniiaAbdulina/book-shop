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

export { createHeaderElement };