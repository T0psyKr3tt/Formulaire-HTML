const formData = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null
};

document.getElementById('first_name').addEventListener('input', (e) => {
    formData.firstName = e.target.value;
    validateField('first_name', formData.firstName, 'error_name', (val) => val.length >= 3);
});

document.getElementById('last_name').addEventListener('input', (e) => {
    formData.lastName = e.target.value;
    validateField('last_name', formData.lastName, 'error_lastname', (val) => val.length >= 3);
});

document.getElementById('email').addEventListener('input', (e) => {
    formData.email = e.target.value;
    validateField('email', formData.email, 'error_email', validateEmail);
});

document.getElementById('password').addEventListener('input', (e) => {
    formData.password = e.target.value;
    validateField('password', formData.password, 'error_password', (val) => val.length >= 8);
});

document.getElementById('confirm_password').addEventListener('input', (e) => {
    formData.confirmPassword = e.target.value;
    validateField('confirm_password', formData.confirmPassword, 'error_confirm_password', (val) => val === formData.password);
});

document.getElementById('mon_form').addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (!formData.firstName || formData.firstName.length < 3) {
        displayError('first_name', 'error_name', "Le champ Prénom est requis et doit avoir au moins 3 caractères.");
        isValid = false;
    }
    if (!formData.lastName || formData.lastName.length < 3) {
        displayError('last_name', 'error_lastname', "Le champ Nom est requis et doit avoir au moins 3 caractères.");
        isValid = false;
    }
    if (!validateEmail(formData.email)) {
        displayError('email', 'error_email', "Veuillez entrer une adresse email valide.");
        isValid = false;
    }
    if (!formData.password || formData.password.length < 8) {
        displayError('password', 'error_password', "Le mot de passe doit avoir au moins 8 caractères.");
        isValid = false;
    }
    if (formData.confirmPassword !== formData.password) {
        displayError('confirm_password', 'error_confirm_password', "Les mots de passe ne correspondent pas.");
        isValid = false;
    }

    if (isValid) {
        console.log('Données soumises:', formData);
        showSuccessMessage();
        resetForm();
    }
});

function validateField(fieldId, fieldValue, errorId, validationFn) {
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

function showSuccessMessage() {
    document.getElementById('success_message').style.display = 'block';
    setTimeout(() => {
        document.getElementById('success_message').style.display = 'none';
    }, 3000);
}

function resetForm() {
    document.getElementById('mon_form').reset();
    formData.firstName = null;
    formData.lastName = null;
    formData.email = null;
    formData.password = null;
    formData.confirmPassword = null;
    hideError('first_name', 'error_name');
    hideError('last_name', 'error_lastname');
    hideError('email', 'error_email');
    hideError('password', 'error_password');
    hideError('confirm_password', 'error_confirm_password');
}
