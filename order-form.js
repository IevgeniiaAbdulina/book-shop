// Order Form Page
// 6. The order form contains fields with own validation rules:

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener(
        'invalid',
        event => {
            input.classList.add('error');
            updateSubmitButtonState();
        },
        false
    );
    // Validate on Blur:
    input.addEventListener('blur', function() {
        input.checkValidity();
        const inputError = document.querySelector(`#${input.id} + span.error`);
        showError(input, inputError);
    });
});

// - Delivery date(mandatory, not earlier than next day)
const date = document.getElementById('date');
let day = new Date().getDate();

// To restrict past date:
let minDate = new Date();
minDate.setDate(day+1);
let minDateStr = minDate.getFullYear() + '-' + (minDate.getMonth()+1) + '-' + minDate.getDate();
date.setAttribute('min', minDateStr);
date.setAttribute('value', minDateStr);

// To restrict future date:
let maxDate = new Date();
maxDate.setDate(day+5);
let maxDateStr = maxDate.getFullYear() + '-' + (maxDate.getMonth()+1) + '-' + maxDate.getDate();
document.getElementById('date').setAttribute('max', maxDateStr);

date.addEventListener('change', event => {
    updateSubmitButtonState();
    if(event.target.value) {
        date.classList.remove('error');
    }
});

// The Complete button is enabled when the user full form with valid information:
function updateSubmitButtonState() {
    const areAllOk = Array
    .from(inputs)
    .map(input => input.validity)
    .every(validity => validity.valid === true && validity.valueMissing === false);

    completeButton.disabled = areAllOk == false;
}

// validation of inputs fields:
inputs.forEach(input => {
    const inputError = document.querySelector(`#${input.id} + span.error`);
    if (!input || !inputError) {
        return
    }
    input.addEventListener('input', (event) => {
        input.checkValidity();
        if (input.validity.valid) {
            inputError.textContent = '';
            input.classList.remove('error');
            updateSubmitButtonState();
        } else {
            showError(input, inputError);
        }
    });
});

// the validation messages are appeared:
function showError(inputToVerify, inputError) {
    if(!inputToVerify || inputToVerify === 'null') {
        return
    }
    // Optional checkboxes and radiobuttons no error
    if(!inputError) {
        return
    }
    if(inputToVerify.validity.valueMissing) {
        // if field is empty:
        inputError.textContent = 'This field is required';
        // inputError.className = 'error';
    } if(inputToVerify.validity.rangeUnderflow) {
        inputError.textContent = inputToVerify.getAttribute('pattern-error-message');
    } else if(inputToVerify.validity.tooShort) {
        // If the data is too short:
        inputError.textContent = `Value should be at least ${inputToVerify.minLength} characters. You entered ${inputToVerify.value.length}`
    } else if(inputToVerify.validity.patternMismatch) {
        // If the field doesn't contain a Name:
        inputError.textContent = inputToVerify.getAttribute('pattern-error-message');
    }
    // Set the styling appropriately:
    inputError.className = 'error active';
}

// 9. After user click on Complete button, he will see the summarized information:
const createInfoModal = (customerInfo) => {
    document.getElementById('customer-name').innerText = `${customerInfo.name} ${customerInfo.surname}`;
    document.getElementById('customer-address').innerText = `${customerInfo.street} street, house ${customerInfo.house}, flat ${customerInfo.flat}`;
    document.getElementById('delivery-date').innerText = `${customerInfo.date}`;
    const totalPrice = localStorage.getItem('totalPrice');
    document.getElementById('total-sum').innerText = `${totalPrice}`;
    document.getElementById('customer-info').style.display = 'flex';
}

function getData(form) {
    let formData = new FormData(form);
    for (let pair of formData.entries()) {
    }

    let customerInfo = Object.fromEntries(formData);

    createInfoModal(customerInfo);

    // Display Info on the page:
    document.getElementById('header').style.display = 'none';
    document.getElementById('order_form').style.display = 'none';
    document.getElementById('customer-info').style.display = 'flex';
}

// Limit selected checkboxes to 2:
let checkboxes = document.querySelectorAll('.check');
let maxChecked = 2;
for (let i=0; i < checkboxes.length; i++) {
    checkboxes[i].onclick = selectiveCheck;
}

function selectiveCheck(event) {
    let checkedItems = document.querySelectorAll('.check:checked');
    if(checkedItems.length >= maxChecked + 1) {
        return false;
    }
}

// Form submiting:
const form = document.querySelector('form');
// 7. The Complete button is disabled until the user full form with valid information:
const completeButton = document.getElementById('submit');
completeButton.disabled = true;

form.addEventListener('submit', function(event) {
    event.preventDefault();
    getData(event.target);

});

// onclick "Change" Button return to Order page:
const clickHandlerChange = () => {
    document.getElementById('header').style.display = 'block';
    document.getElementById('order_form').style.display = 'block';
    document.getElementById('customer-info').style.display = 'none';
};

const clickHandlerConfirm = () => {
    localStorage.setItem('totalPrice', '');
}

document.getElementById('change-btn').addEventListener('click', (event) => {
    clickHandlerChange();
});

document.getElementById('confirm-btn').addEventListener('click', (event) => {
    clickHandlerConfirm();
});