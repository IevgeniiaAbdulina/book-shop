// Create popup with book description:
const bookPopup = (book, hideModalWindow, hideModalWindowOnBlur) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'modal-overlay';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.addEventListener('click', event => {
        document.body.removeChild(modalOverlay);
        hideModalWindowOnBlur();
    });
    document.body.append(modalOverlay);

    const popup = document.createElement('div');
    popup.id = 'modal'
    popup.className = 'popup';
    modalOverlay.appendChild(popup);

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const title = document.createElement('h3');
    title.innerText = book.title;
    title.className = 'modal-title';
    const description = document.createElement('p');
    description.innerText = book.description;
    modalContent.append(title, description);

    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    const closeModal = document.createElement('button');
    closeModal.id = 'close-modal';
    closeModal.className = 'close-modal-button';
    closeModal.innerText = 'Close';
    closeModal.addEventListener('click', event => {
        document.body.removeChild(modalOverlay);
        hideModalWindow();
    });

    popup.append(modalContent, modalFooter);
    modalFooter.appendChild(closeModal);
}

export {bookPopup};