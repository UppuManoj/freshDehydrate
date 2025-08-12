document.addEventListener('DOMContentLoaded', () => {
    // Load navbar
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });

    // Load footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePassword = document.querySelector('.toggle-password');
    const form = document.getElementById('signup-form');
    const mobileInput = document.getElementById('mobile');

    // Allow only numbers in the mobile input field
    mobileInput.addEventListener('input', () => {
        mobileInput.value = mobileInput.value.replace(/\D/g, '');
    });

    const criteria = {
        length: document.getElementById('length'),
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        number: document.getElementById('number'),
        special: document.getElementById('special')
    };

    const validations = {
        length: val => val.length >= 8,
        uppercase: val => /[A-Z]/.test(val),
        lowercase: val => /[a-z]/.test(val),
        number: val => /[0-9]/.test(val),
        special: val => /[!@#$%^&*]/.test(val)
    };

    passwordInput.addEventListener('input', () => {
        const value = passwordInput.value;
        for (const key in validations) {
            const element = criteria[key];
            const isValid = validations[key](value);
            if (isValid) {
                element.classList.add('valid');
                element.classList.remove('invalid');
            } else {
                element.classList.add('invalid');
                element.classList.remove('valid');
            }
        }
    });

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        // Hide all error messages initially
        document.querySelectorAll('.error-message').forEach(msg => msg.classList.remove('show'));
        document.querySelectorAll('input[required]').forEach(input => input.classList.remove('input-error'));

        // Check each required field
        const requiredInputs = form.querySelectorAll('input[required]');
        requiredInputs.forEach(input => {
            if (input.id === 'mobile') {
                if (!/^\d{10}$/.test(input.value.trim())) {
                    const errorElement = document.getElementById('mobile-error');
                    errorElement.textContent = 'Please enter a valid 10-digit mobile number.';
                    errorElement.classList.add('show');
                    input.classList.add('input-error');
                    isFormValid = false;
                }
            } else if (input.value.trim() === '') {
                const errorId = `${input.id}-error`;
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.add('show');
                }
                input.classList.add('input-error');
                isFormValid = false;
            }
        });

        // Password validation
        const password = passwordInput.value;
        let isPasswordCriteriaMet = true;
        for (const key in validations) {
            if (!validations[key](password)) {
                isPasswordCriteriaMet = false;
                break;
            }
        }

        if (!isPasswordCriteriaMet) {
            alert('Please ensure your password meets all the criteria.');
            isFormValid = false;
        }

        // Password confirmation validation
        const confirmPassword = confirmPasswordInput.value;
        if (password !== confirmPassword) {
            const errorElement = document.getElementById('confirm-password-error');
            errorElement.textContent = 'Passwords do not match.';
            errorElement.classList.add('show');
            confirmPasswordInput.classList.add('input-error');
            isFormValid = false;
        } else {
             const errorElement = document.getElementById('confirm-password-error');
             if(confirmPassword === ''){
                errorElement.textContent = 'Please confirm your password.';
             } else {
                errorElement.textContent = '';
             }
        }

        if (isFormValid) {
            alert('Signup successful!');
            form.reset();
            for (const key in criteria) {
                criteria[key].classList.remove('valid', 'invalid');
            }
        }
    });
});
