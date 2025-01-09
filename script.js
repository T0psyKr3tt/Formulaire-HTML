const formData = {
    firstName: null,
    lastName: null,
    email: null
};

document.getElementById('first_name').addEventListener('input', (e) => {
    formData.firstName = e.target.value;
    validateField('first_name', formData.firstName, 'error_name');
});

document.getElementById('last_name').addEventListener('input', (e) => {
    formData.lastName = e.target.value;
    validateField('last_name', formData.lastName, 'error_lastname');
});

document.getElementById('email').addEventListener('input', (e) => {
    formData.email = e.target.value;
    validateField('email', formData.email, 'error_email', validateEmail);
});

document.getElementById('mon_form').addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (!formData.firstName) {
        displayError('first_name', 'error_name', "Le champ Prénom est requis.");
        isValid = false;
    }
    if (!formData.lastName) {
        displayError('last_name', 'error_lastname', "Le champ Nom est requis.");
        isValid = false;
    }
    if (!validateEmail(formData.email)) {
        displayError('email', 'error_email', "Veuillez entrer une adresse email valide.");
        isValid = false;
    }

    if (isValid) {
        console.log('Données soumises:', formData);
        document.getElementById('success_message').style.display = 'block';
        resetForm();
    }
});

function validateField(fieldId, fieldValue, errorId, validationFn = (val) => val) {
    if (!validationFn(fieldValue)) {
        displayError(fieldId, errorId, `Le champ ${fieldId.replace('_', ' ')} est incorrect.`);
    } else {
        hideError(fieldId, errorId);
    }
}

function displayError(fieldId, errorId, message) {
    document.getElementById(fieldId).classList.add('error');
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = 'block';
    errorElement.textContent = message;
}

function hideError(fieldId, errorId) {
    document.getElementById(fieldId).classList.remove('error');
    document.getElementById(errorId).style.display = 'none';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function resetForm() {
    document.getElementById('mon_form').reset();
    formData.firstName = null;
    formData.lastName = null;
    formData.email = null;
    hideError('first_name', 'error_name');
    hideError('last_name', 'error_lastname');
    hideError('email', 'error_email');
}
