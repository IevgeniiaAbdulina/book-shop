function orderBooks() {
    const createElem = (tagName, className, id) => {
        let elem = document.createElement(tagName);
        if(className) elem.className = className;
        if(id) elem.id = id;
        return elem;
    };
    let fragment = new DocumentFragment();

    const orderHeader = createElem('h2', 'order-header');
    orderHeader.innerText = 'Order books';

    const orderWrapper = createElem('div', 'order-wrapper');
    const orderContainer = createElem('div', 'order-container', 'droptarget');
    const bagButton = createElem('button', 'bag-button');

    const bagText = createElem('div', 'bag-text');
    bagText.innerHTML = '<p>My Books</p>';

    const bagIcon = createElem('img');
    bagIcon.src = '/assets/icons/basket-24.png';
    bagIcon.alt = 'bag icon';

    const booksCount = createElem('div', 'books-count');
    booksCount.innerText = '0';

    bagText.append(bagIcon);
    bagButton.append(bagText, booksCount);

    fragment
        .appendChild(orderWrapper)
        .append(
            orderHeader,
            orderContainer,
            bagButton
        );

    return fragment;
}

export { orderBooks };

// todo:
// *  the total sum is updated
// * When user click on Confirm order he appears in the Order page ( with form )