document.addEventListener('DOMContentLoaded', () => {
    const URL = 'https://m25mvnsk-3000.use2.devtunnels.ms/userRegistration'; // URL del servidor local JSON
    const idUser = Date.now().toString(30);
    const form = document.querySelector('#userForm');
    const imageUser = document.querySelector('#fileInput');
    const displayImage = document.querySelector('#displayImage');
    const nameInput = document.querySelector('#namesInput');
    const lastNamesInput = document.querySelector('#lastNamesInput');
    const documentType = document.querySelector('#documentType');
    const documentNumberInput = document.querySelector('#documentNumberInput');
    const phoneInput = document.querySelector('#phoneInput');
    const smartPhoneInput = document.querySelector('#smartPhoneInput');
    const emailInput = document.querySelector('#emailInput');
    const passwordInput = document.querySelector('#passwordInput');
    const passwordInput2 = document.querySelector('#passwordInput2');
    const addressInput = document.querySelector('#addressInput');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const file = imageUser.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function(event) {
                const base64String = event.target.result.split(',')[1];

                const newUser = {
                    id: idUser,
                    image: base64String,
                    name: nameInput.value,
                    lastNames: lastNamesInput.value,
                    documentType: documentType.value,
                    documentNumber: documentNumberInput.value,
                    phone: phoneInput.value,
                    smartPhone: smartPhoneInput.value,
                    email: emailInput.value,
                    password: passwordInput.value,
                    address: addressInput.value
                };

                addUser(newUser);
            }
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, seleccione un archivo primero.');
        }
    });

    async function addUser(newUser) {
        if (passwordInput.value === passwordInput2.value) {
            try {
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
                if (response.ok) {
                    console.log('Usuario añadido correctamente.');
                    redirect();
                } else {
                    const errorData = await response.json();
                    console.error('Error al añadir el usuario:', errorData);
                    alert(`Error al guardar el usuario: ${errorData.message || response.statusText}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert(`Ah ocurrido un error al guardar el usuario: ${error.message}`);
            }
        } else {
            alert('Las contraseñas no coinciden.');
        }
    }

    function clearForm() {
        imageUser.value = '';
        nameInput.value = '';
        lastNamesInput.value = "";
        documentType.value = "";
        documentNumberInput.value = "";
        phoneInput.value = "";
        smartPhoneInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        passwordInput2.value = "";
        addressInput.value = "";
        displayImage.style.display = 'none';
    }

    function redirect() {
        localStorage.setItem('userEmail', emailInput.value);
        window.location.href = './userProfile.html';
    }
});

function mostrarImagen(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.userImage').style.backgroundImage = `url('${e.target.result}')`;
        }

        reader.readAsDataURL(input.files[0]);
    }
}
