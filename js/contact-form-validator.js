$(document).ready(function() {
    $('#cf-submit').click(function() { //podpinamy się pod element html o ID 'cf-submit', reagujemy na 'click event'
        let email = $('#cf-email').val();
        let content = $('#cf-content').val();

        let isValidEmail = validateEmail(email);
        let isContentFilled = content.length > 0; 
    });
});

function validateEmail(email) { //deklaracja funkcji validateEmail
    let emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return email.match(emailRegexp);
}