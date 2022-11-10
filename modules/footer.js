// Create Footer elements:
const createFooterElements = () => {
    const tagFooter = document.createElement('footer');

    const footerContainer = document.createElement('div');
    footerContainer.className = 'footer-container';

    const navDescription = document.createElement('div');
    navDescription.className = 'nav-description';

    const navDescriptionText = document.createElement('p');
    navDescriptionText.innerText = 'SCROLL TO NAVIGATE';

    const navDescriptionText2 = document.createElement('p');
    navDescriptionText2.innerText = 'DRAG and drop to add book to bag';
    navDescription.append(navDescriptionText, navDescriptionText2);

    const divArrows = document.createElement('div');
    divArrows.className = 'arrows';

    const arrowLeft = document.createElement('img');
    arrowLeft.className = 'arrow left';
    arrowLeft.setAttribute('src', '/assets/icons/arrow-left.svg');
    arrowLeft.setAttribute('alt', 'arrow icon');

    const arrowRight = document.createElement('img');
    arrowRight.className = 'arrow right';
    arrowRight.setAttribute('src', '/assets/icons/arrow-right.svg');
    arrowRight.setAttribute('alt', 'arrow icon');

    divArrows.append(arrowLeft, arrowRight);

    const divAttribution = document.createElement('div');
    divAttribution.className = 'attribution';
    divAttribution.innerHTML = '<p>Coded by Abdulina</p>';

    tagFooter.append(footerContainer);
    footerContainer.append(navDescription, divArrows, divAttribution);

    return tagFooter;
}

export { createFooterElements };