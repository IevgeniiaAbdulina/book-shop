// Order Form Page
// // // - Name (mandatory, the length not less than 4 symbols, strings only, without spaces)
// // // - Surname (mandatory, the length not less than 5 symbols, strings only, without spaces)
// // // - validation of form fields should run after user left the field (blur)

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener(
        'invalid',
        event => {
            input.classList.add('error');
        },
        false
    );
    // Validate on Blur:
    input.addEventListener('blur', function() {
        input.checkValidity();
    })
});

// // // - Delivery date(mandatory, not earlier than next day)
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