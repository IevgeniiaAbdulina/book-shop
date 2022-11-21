// Create Footer elements:
const createFooterElements = () => {
    const tagFooter = document.createElement('footer');

    const footerContainer = document.createElement('div');
    footerContainer.className = 'footer-container';

    const navDescription = document.createElement('div');
    navDescription.className = 'nav-description';

    const navDescriptionText = document.createElement('p');
    navDescriptionText.innerText = 'Click to Add to bag button';

    const navDescriptionText2 = document.createElement('p');
    navDescriptionText2.innerText = 'or drag and drop to add book to bag';
    navDescription.append(navDescriptionText, navDescriptionText2);

    const divAttribution = document.createElement('div');
    divAttribution.className = 'attribution';
    divAttribution.innerHTML = '<p>Coded by Abdulina</p>';

    tagFooter.append(footerContainer);
    footerContainer.append(navDescription, divAttribution);

    return tagFooter;
}

export { createFooterElements };