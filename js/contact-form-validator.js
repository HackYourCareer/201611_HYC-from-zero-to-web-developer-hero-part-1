$(document).ready(function () {

    $('#cf-submit').click(function () {
        console.log('validating!')
        let email = $('#cf-email').val();
        let content = $('#cf-content').val();
        
        let isValidEmail = validateEmail(email);
        let isValidContent = validateContent(content);

        
    });
});

function validateEmail(email) {
    let hasAtSign = email.indexOf('@') !== -1;
    let emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return email.match(emailRegexp);
}

function validateContent() {
    
}