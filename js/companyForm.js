function mostrarImagen(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.userImage').style.backgroundImage = `url('${e.target.result}')`;
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

// Funciones para almacenar en el JSON.
// URL
const URL = "http://localhost:3000/companyName";

// Llamar los input a objetos
const submitProfileDiv = document.querySelector('.submitProfileDiv');
const idUser = Date.now().toString(30);
const imageUser = document.querySelector('.fileInput');
const ourPhotos = document.querySelector('.ourPhotos');
const responsableName = document.querySelector('#responsableName');
const responsableLastName = document.querySelector('#responsableLastName');
const socialReason = document.querySelector('#socialReason');
const personType = document.querySelector('#personType');
const documentType = document.querySelector('#documentType');
const numberId = document.querySelector('#numberId');
const telephoneNumber = document.querySelector('#telephoneNumber');
const whatsappNumber = document.querySelector('#whatsappNumber');
const ciiuCode = document.querySelector('#ciiuCode');
const categoriesCompany = document.querySelector('#categoriesCompany');
const speciality = document.querySelector('#speciality');
const companyEmail = document.querySelector('#companyEmail');
const companyPassword = document.querySelector('#companyPassword');
const companyPassword2 = document.querySelector('#companyPassword2');
const companyAddress = document.querySelector('#companyAddress');
const registerDocument1 = document.querySelector('#registerDocument1');
const registerDocument2 = document.querySelector('#registerDocument1');
const submitButton = document.querySelector('#submitButton');

document.addEventListener("DOMContentLoaded", () => {
    //Llamar la función encargada de obtener los usuarios

    submitButton.addEventListener("click", (event) => {
        //Quitar acciones por defecto
        event.preventDefault();
        //Llamamos la función que se encarga de agregar al usuario
        verifyingInformation();
        redirect();
    });
});

async function verifyingInformation(){
    if (companyPassword.value === companyPassword2.value){
        addUser();
    }
    else{
        alert('Las contraseñas no coinciden.');
    }
}

async function addUser() {
    const newCompany = {
        image: imageUser.value,
        responsableName: responsableName.value,
        responsableLastName: responsableLastName.value,
        socialReason: socialReason.value,
        personType: personType.value,
        documentType: documentType.value,
        numberId: numberId.value,
        telephoneNumber: telephoneNumber.value,
        whatsappNumber: whatsappNumber.value,
        ciiuCode: ciiuCode.value,
        categoriesCompany: categoriesCompany.value,
        speciality: speciality.value,
        companyEmail: companyEmail.value,
        companyPassword: companyPassword.value,
        companyAddress: companyAddress.value,
        registerDocument1: registerDocument1.value,
        registerDocument2: registerDocument2.value,
        ourPhotos: ourPhotos.value
    };
    
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCompany)
        });

        if (response.ok) {
            console.log('Usuario añadido correctamente.');
            clearForm();
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
