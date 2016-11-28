$(document).ready(function() {
    $('#cf-submit').click(function() {
        let email = $('#cf-email').val();
        let content = $('#cf-content').val();

        let isValidEmail = validateEmail(email);
        let isContentFilled = content.length > 0; 

        if (isValidEmail && isContentFilled) {   //wysyłamy email...
            sendEmail(email, content, addConfirmationMessage); 
        }
        else { //...lub pokazujemy błąd
            if (!isValidEmail) {
                addErrorMessage('Podaj prawidłowy adres email!');
            }
            else {
                addErrorMessage('Hej, wysil się trochę!');
            }
        }
        return false;
    });

    $('#cf-email, #cf-content').click(function() {
        removeSubmissionInfo();
    });
});

function validateEmail(email) {
    let emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return email.match(emailRegexp);
}

function addConfirmationMessage() {
    const confirmMsg = 'Twoja wiadomość poleciała do Andrzeja!'
    $('#submission-info').text(confirmMsg);
}

function addErrorMessage(errorMsg) {
    $('#submission-info').text(errorMsg);
}

function removeSubmissionInfo() {
    $('#submission-info').text('');
}

function sendEmail(email, content, callback) {
    $.ajax({   //żądanie do serwera, bez przeładowania strony
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