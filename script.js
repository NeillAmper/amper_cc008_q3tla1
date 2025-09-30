document.addEventListener('DOMContentLoaded', () => {
    const infoForm = document.getElementById('infoForm');
    
    if (infoForm) {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');


        const clearPasswordErrorStyle = () => {
            password.style.borderColor = '';
            confirmPassword.style.borderColor = '';
        };


        password.addEventListener('input', clearPasswordErrorStyle);
        confirmPassword.addEventListener('input', clearPasswordErrorStyle);

        infoForm.addEventListener('submit', function(event) {
            event.preventDefault();


            if (password.value !== confirmPassword.value) {
                alert('Passwords do not match. Please try again.');
                password.style.borderColor = '#ef4444';
                confirmPassword.style.borderColor = '#ef4444';
                return;
            }
            
            const userConfirmed = confirm("Are you sure you want to save and submit your information?");
            if (!userConfirmed) {
                return;

            }

            const photoInput = document.getElementById('photo');
            const file = photoInput.files[0];
            const formData = new FormData(infoForm);
            const params = new URLSearchParams();

            for (let pair of formData.entries()) {
                if (pair[0] !== 'photo') {
                    params.append(pair[0], pair[1]);
                }
            }
            
            const navigateToOutput = () => {
                window.location.href = infoForm.action + '?' + params.toString();
            };

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    localStorage.setItem('userAvatar', e.target.result);
                    navigateToOutput();
                };
                reader.onerror = function() {
                    console.error("Error reading file");
                    navigateToOutput(); 
                };
                reader.readAsDataURL(file);
            } else {
                localStorage.removeItem('userAvatar');
                navigateToOutput();
            }
        });
    }

    const outputAvatar = document.getElementById('output-avatar');
    if (outputAvatar) {
        const imageData = localStorage.getItem('userAvatar');
        if (imageData) {
            outputAvatar.src = imageData;
        } else {
            outputAvatar.style.display = 'none';
        }
    }
    
    const params = new URLSearchParams(window.location.search);
    const displayData = (paramName, elementId) => {
        const element = document.getElementById(elementId);
        const value = params.get(paramName);
        if (element && value) {
            element.textContent = value;
        }
    };

    displayData('fname', 'output-fname');
    displayData('mname', 'output-mname');
    displayData('lname', 'output-lname');
    displayData('dob', 'output-dob');
    displayData('birthplace', 'output-birthplace');
    displayData('gender', 'output-gender');
    displayData('civilStatus', 'output-civilStatus');
    displayData('nationality', 'output-nationality');
    displayData('religion', 'output-religion');
    displayData('contact', 'output-contact');
    displayData('email', 'output-email');
    displayData('address', 'output-address');
    displayData('emergencyName', 'output-emergencyName');
    displayData('emergencyRelationship', 'output-emergencyRelationship');
    displayData('emergencyContact', 'output-emergencyContact');
    displayData('username', 'output-username');
});