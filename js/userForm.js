function mostrarImagen(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.userImage').style.backgroundImage = `url('${e.target.result}')`;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

// Funciones para almacenar en el JSON.
// URL
const URL = "http://localhost:3000/userRegistration";

// Llamar los input a objetos
const userForm = document.querySelector('#userForm');
const idUser = Date.now().toString(30);
const imageUser = document.querySelector('#fileInput');
const file = imageUser.files[0];
const namesInput = document.querySelector('#namesInput');
const lastNamesInput = document.querySelector('#lastNamesInput');
const documentType = document.querySelector('#documentType');
const documentNumberInput = document.querySelector('#documentNumberInput');
const phoneInput = document.querySelector('#phoneInput');
const smartPhoneInput = document.querySelector('#smartPhoneInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordInput2 = document.querySelector('#passwordInput2');
const addressInput = document.querySelector('#addressInput');

document.addEventListener("DOMContentLoaded", () => {
    //Llamar la función encargada de obtener los usuarios

    userForm.addEventListener("submit", (event) => {
        //Quitar acciones por defecto
        event.preventDefault();
        //Llamamos la función que se encarga de agregar al usuario
        verifyingInformation();

        document.getElementById('uploadButton').addEventListener('click', () => {
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];
        
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    const base64String = event.target.result.split(',')[1]; // Eliminar el prefijo de base64
        
                    const data = {
                        imageName: file.name,
                        imageData: base64String
                    };
        
                    // Mostrar el JSON en la página
                    document.getElementById('jsonOutput').textContent = JSON.stringify(data, null, 2);
        
                    // Mostrar la imagen en la página
                    const imgElement = document.getElementById('displayImage');
                    imgElement.src = event.target.result;
                    imgElement.style.display = 'block';
                };
        
                reader.readAsDataURL(file); // Leer el archivo como una URL de datos
            } else {
                alert('Por favor, selecciona un archivo primero.');
            }
        });
    });
});

async function verifyingInformation(){
    if (passwordInput.value === passwordInput2.value){
        await addUser();
    }
    else{
        alert('Las contraseñas no coinciden.');
    }
}

async function addUser() {
    const newUser = {
        image: imageUser.value,
        names: namesInput.value,
        lastNames: lastNamesInput.value,
        documentType: documentType.value,
        documentNumber: documentNumberInput.value,
        phone: phoneInput.value,
        smartPhone: smartPhoneInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        address: addressInput.value
    };
    
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
            clearForm();
            redirect();
        } else {
            throw new Error('Error adding user');
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Ah ocurrido un error al guardar el usuario.',
            icon: 'error',
            confirmButtonText: 'Cool'
        });
    }
}

function clearForm() {
    imageUser.value = "";
    namesInput.value = "";
    lastNamesInput.value = "";
    documentType.value = "";
    documentNumberInput.value = "";
    phoneInput.value = "";
    smartPhoneInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    passwordInput2.value = "";
    addressInput.value = "";
}

function redirect(){
    window.location.replace("../index.html");
}
