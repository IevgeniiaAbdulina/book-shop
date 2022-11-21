// Order Form Page
// 6. The order form contains fields with own validation rules:
// - Name (mandatory, the length not less than 4 symbols, strings only, without spaces)
// - Surname (mandatory, the length not less than 5 symbols, strings only, without spaces)
// - validation of form fields should run after user left the field (blur)

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
        //updateSubmitButtonState();
        const inputError = document.querySelector(`#${input.id} + span.error`);
        showError(input, inputError);
    });
});

// Form submiting:
const form = document.querySelector('form');
// 7. The Complete button is disabled until the user full form with valid information:
const completeButton = document.getElementById('submit');
completeButton.disabled = true;

form.addEventListener('submit', (event) => {
    // if the inputs are invalid:
    if (completeButton.disabled) {
        showError();
        event.preventDefault();
    }
});

// - Delivery date(mandatory, not earlier than next day)
const date = document.getElementById('date');
let day = new Date().getDate();

// To restrict past date:
let minDate = new Date();
minDate.setDate(day+1);
let minDateStr = minDate.getFullYear() + '-' + (minDate.getMonth()+1) + '-' + minDate.getDate();
document.getElementById('date').setAttribute('min', minDateStr);

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
    //console.log('are all ok: ', areAllOk);

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
let infoMessage = document.getElementById('customer-info');
let info = document.createElement('p');
infoMessage.appendChild(info);

function getData(form) {
    let formData = new FormData(form);

    for (let pair of formData.entries()) {
        // console.log(pair[0]+': '+pair[1]);
    }
    let customerInfo = Object.fromEntries(formData);

    let street = customerInfo.street;
    let house = customerInfo.house;
    let flat = customerInfo.flat;
    let customerName = customerInfo.name;
    let customerSurname = customerInfo.surname;

    info.innerText = `The delivery address is ${street} street house ${house} flat ${flat}. Customer ${customerName} ${customerSurname}.`;

    // Display Info on the page:
    document.getElementById('header').style.display = 'none';
    document.getElementById('order_form').style.display = 'none';
    document.getElementById('customer-info').style.display = 'flex';
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    getData(event.target);
});

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