document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/companyName'; // URL del servidor local JSON
    const idUser = Date.now().toString(30);
    const imageUser = document.querySelector('#fileInput');
    const archivos = document.querySelectorAll('#companyImages input[type="file"]');
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
    const registerDocument2 = document.querySelector('#registerDocument2');
    const submitButton = document.querySelector('#submitButton');
    const municipalityDropdown = document.querySelector('#myDropdown');

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const file = imageUser.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = async function(event) {
                const base64String = event.target.result.split(',')[1];
                console.log("Main Image Base64:", base64String); // Debugging

                // Convertir archivos adicionales a Base64
                const imagenesBase64Promises = Array.from(archivos).map(fileInput => {
                    if (fileInput.files.length > 0) {
                        console.log("Processing file input:", fileInput);
                        return convertToBase64(fileInput.files[0]);
                    }
                    return Promise.resolve(''); // Resolver con una cadena vacía si no hay archivo
                });

                // Esperar a que todas las promesas se resuelvan
                const imagenesBase64 = await Promise.all(imagenesBase64Promises);

                console.log("Additional Images Base64:", imagenesBase64); // Debugging

                // Obtener los valores seleccionados de los checkboxes
                const selectedMunicipalities = Array.from(municipalityDropdown.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(checkbox => checkbox.value);
                console.log("Selected Municipalities:", selectedMunicipalities); // Debugging

                const newUser = {
                    id: idUser,
                    image: base64String,
                    imagenes: imagenesBase64.filter(base64 => base64), // Filtrar los archivos vacíos
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
                    municipalities: selectedMunicipalities,
                    companyEmail: companyEmail.value,
                    companyPassword: companyPassword.value,
                    companyAddress: companyAddress.value,
                    registerDocument1: registerDocument1.value,
                    registerDocument2: registerDocument2.value,
                    ourPhotos: ourPhotos.value
                    // Añadir los municipios seleccionados
                };

                console.log("New User Object:", newUser); // Debugging

                await addUser(newUser);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, seleccione un archivo primero.');
        }
    });

    async function addUser(newUser) {
        if (companyPassword.value === companyPassword2.value) {
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
                    throw new Error('Error al añadir el usuario.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Ha ocurrido un error al guardar el usuario.');
            }
        } else {
            alert('Las contraseñas no coinciden.');
        }
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                resolve('');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    }

    function redirect() {
        window.location.href = './companyProfile.html';
    }
});

function mostrarImagen(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector('.userImage').style.backgroundImage = `url('${e.target.result}')`;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Prevents the dropdown from closing when clicking inside it
document.getElementById("myDropdown").addEventListener('click', function(event) {
    event.stopPropagation();
});

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
