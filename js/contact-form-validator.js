$(document).ready(function() {
    $('#cf-submit').click(function() {
        let email = $('#cf-email').val();
        let content = $('#cf-content').val();

        let isValidEmail = validateEmail(email);

        if (isValidEmail) {
            sendEmail(email, content, addConfirmationMessage);
        }
        else {
            addErrorMessage();
        }
        return false;
    });
});

function validateEmail(email) {
    let emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return email.match(emailRegexp);
}

function addConfirmationMessage() {

}

function addErrorMessage() {
    
}

function sendEmail(email, content, callback) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:2403/emaile',
        data: {
            nadawca: email,
            tresc: content
        }
    }).done(function(response) {
        callback();
    })
}