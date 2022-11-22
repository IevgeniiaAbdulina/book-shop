const createElem = (tagName, className, id) => {
    let elem = document.createElement(tagName);
    if(className) elem.className = className;
    if(id) elem.id = id;
    return elem;
};

function orderBooks(confirmOrder) {
    let fragment = new DocumentFragment();

    const orderHeader = createElem('h2', 'order-header');
    orderHeader.innerText = 'Order books';

    const orderWrapper = createElem('div', 'order-wrapper');
    const orderContainer = createElem('div', 'order-container', 'droptarget');

    showEmptyMessage(orderContainer);

    // Confirm order Button:
    const confirmForm = createElem('form', 'confirm-form', 'confirm');
    confirmForm.action = './order.html';
    confirmForm.target = '_blank';

    const sum = createElem('label', 'total-sum', 'total');
    sum.innerText = 'Total: $ 0';

    const inputSubmit = createElem('input', 'confirm-order-button');
    inputSubmit.type = 'submit';
    inputSubmit.value = 'Confirm order';
    inputSubmit.addEventListener('click', (e) => {
        confirmOrder();
    });

    confirmForm.append(sum, inputSubmit);
    fragment
        .appendChild(orderWrapper)
        .append(
            orderHeader,
            orderContainer,
            confirmForm
        );

    return fragment;
}

const showEmptyMessage = (parent) => {
    let emptyBagMessage = createElem('p', 'empty-bag', 'empty-bag');
    emptyBagMessage.innerText = 'Drag and drop here';
    if(!parent) {
        parent = document.getElementById('droptarget');
    }
    parent.appendChild(emptyBagMessage);
}

export { orderBooks, showEmptyMessage };