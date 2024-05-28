document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/companyName'; //http://localhost:3000/
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
    const categoriesCompany = document.querySelector('#categoriesCompany');
    const speciality = document.querySelector('#speciality');
    const companyEmail = document.querySelector('#companyEmail');
    const companyPassword = document.querySelector('#companyPassword');
    const companyPassword2 = document.querySelector('#companyPassword2');
    const companyAddress = document.querySelector('#companyAddress');
    const registerDocument1 = document.querySelector('#registerDocument1');
    const registerDocument2 = document.querySelector('#registerDocument2');
    const submitButton = document.querySelector('#submitButton');
    const municipalityDropdown = document.querySelector('#cityFilter');
    const comment = document.querySelector('#comment');

    const checkboxes = document.querySelectorAll('#myDropdown input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.parentElement.classList.add('selected');
            } else {
                this.parentElement.classList.remove('selected');
            }
        });
    });


    function updateSpecialityOptions() {
        const selectedCategory = categoriesCompany.value;
        const optgroups = speciality.querySelectorAll('optgroup');

        optgroups.forEach(optgroup => {
            if (optgroup.label === selectedCategory) {
                optgroup.style.display = 'block';
                optgroup.querySelectorAll('option').forEach(option => {
                    option.disabled = false;
                });
            } else {
                optgroup.style.display = 'none';
                optgroup.querySelectorAll('option').forEach(option => {
                    option.disabled = true;
                });
            }
        });

        speciality.selectedIndex = 0;
    }

    categoriesCompany.addEventListener('change', updateSpecialityOptions);

    updateSpecialityOptions();

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const file = imageUser.files[0];
        const document1 = registerDocument1.files[0];
        const document2 = registerDocument2.files[0];

        if (file && document1 && document2) {
            const reader = new FileReader();

            reader.onload = async function(event) {
                const base64String = event.target.result.split(',')[1];
                console.log("Main Image Base64:", base64String); 

                const doc1Base64 = await convertToBase64(document1);
                const doc2Base64 = await convertToBase64(document2);

                // Convertir archivos adicionales a Base64
                const imagenesBase64Promises = Array.from(archivos).map(fileInput => {
                    if (fileInput.files.length > 0) {
                        console.log("Processing file input:", fileInput);
                        return convertToBase64(fileInput.files[0]);
                    }
                    return Promise.resolve(''); 
                });


                const imagenesBase64 = await Promise.all(imagenesBase64Promises);

                console.log("Additional Images Base64:", imagenesBase64);

                const newUser = {
                    id: idUser,
                    image: base64String,
                    imagenes: imagenesBase64.filter(base64 => base64),
                    responsableName: responsableName.value,
                    responsableLastName: responsableLastName.value,
                    socialReason: socialReason.value,
                    personType: personType.value,
                    documentType: documentType.value,
                    numberId: numberId.value,
                    telephoneNumber: telephoneNumber.value,
                    whatsappNumber: whatsappNumber.value,
                    categoriesCompany: categoriesCompany.value,
                    speciality: speciality.value,
                    city: municipalityDropdown.value,
                    companyEmail: companyEmail.value,
                    companyPassword: companyPassword.value,
                    companyAddress: companyAddress.value,
                    registerDocument1: doc1Base64,
                    registerDocument2: doc2Base64,
                    ourPhotos: ourPhotos.value,
                    comment : comment.value
                };

                console.log("New User Object:", newUser);

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
        localStorage.setItem('userEmail', companyEmail.value);
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