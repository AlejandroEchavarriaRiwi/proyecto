document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3000/companyName";
    const welcome = document.querySelector('#showName');
    const mainContainer = document.querySelector('body');
    const perfilWarning = document.querySelector('#logo');
    const logoContainer = document.querySelector('#logo');
    const photosContainers = document.querySelectorAll('.companyPhotos'); // Selecciona todos los elementos con la clase .companyPhotos
    const nameContainer = document.querySelector('#personalName');
    const documentTypeContainer = document.querySelector('#PersonalDocumentType');
    const documentNumberContainer = document.querySelector('#personalDocumentNumber');
    const passworsContainer = document.querySelector('#personalPassword');
    const socialReasonContainer = document.querySelector('#companySocialReason');
    const regimenTypeContainer = document.querySelector('#companyRegimenType');
    const personTypeContainer = document.querySelector('#companyPersonType');
    const companyTelephoneContainer = document.querySelector('#companyTelephone');
    const companyWhatsappContainer = document.querySelector('#companyWhatsApp');
    const ciiuContainer = document.querySelector('#companyCodeCiiu');
    const companyCategoryContainer = document.querySelector('#companyCategory');
    const companySpecializationContainer = document.querySelector('#companySpecialization');
    const companyDocumentRegister = document.querySelector('#companyDocumentoRegister');
    const companyEmailContainer = document.querySelector('#companyEmail');
    const companyAddressContainer = document.querySelector('#companyAddress');
    const commentContainer = document.querySelector('#companyComment');
    const userMail = localStorage.getItem('userEmail')
    try {
        const response = await fetch(URL);
        const userCompany = await response.json();
        const filteredCompany = userCompany.filter(user => user.companyEmail === userMail);
        if (filteredCompany.length > 0) {
            const user = filteredCompany[0];
            // Llamamos la imagen al perfil de la compañia.
            const welcomeName = document.createElement('h4');
            welcomeName.textContent = `${user.responsableName} ${user.responsableLastName}`;
            const imgLogo = document.createElement('img');
            imgLogo.src = `data:image/png;base64,${user.image}`;
            imgLogo.alt = `${user.responsableName} ${user.responsableLastName}`;
            imgLogo.classList.add('imgLogo');
            // La funcion para colocar todas las fotos esta en el JS de construction.js
            function ourPhotos() {
                if (user.imagenes && user.imagenes.length > 0) {
                    user.imagenes.slice(0, 6).forEach((imagenBase64, index) => {
                        const sectionimg = document.createElement('section');
                        sectionimg.classList.add('slider-section');
                        sectionimg.dataset.index = index; // Agregar un data-attribute para el índice
            
                        const additionalImgElement = document.createElement('img');
                        additionalImgElement.src = `data:image/png;base64,${imagenBase64}`;
                        additionalImgElement.alt = `${user.responsableName} ${user.responsableLastName} Image ${index + 1}`;
                        additionalImgElement.classList.add('additionalProfileImage');
                        sectionimg.appendChild(additionalImgElement);
            
                        const targetContainer = photosContainers[index % photosContainers.length]; // Distribuye las fotos entre los contenedores
                        targetContainer.appendChild(sectionimg);
            
                        const modal = document.createElement('div');
                        modal.classList.add('modal');
            
                        const modalContent = document.createElement('div');
                        modalContent.classList.add('modal-content');
            
                        const closeBtn = document.createElement('span');
                        closeBtn.classList.add('close');
                        closeBtn.innerHTML = '&times;';
                        const acceptBtn = document.createElement('button');
                        acceptBtn.classList.add('acceptBtn');
                        acceptBtn.textContent = 'Si';
                        const cancelBtn = document.createElement('button');
                        cancelBtn.classList.add('cancelBtn');
                        cancelBtn.textContent = 'No';
                        const alertText = document.createElement('h2');
                        alertText.textContent = '¿Deseas eliminar la imagen?';
            
                        modalContent.appendChild(closeBtn);
                        modalContent.appendChild(alertText);
                        modalContent.appendChild(acceptBtn);
                        modalContent.appendChild(cancelBtn);
                        modal.appendChild(modalContent);
                        mainContainer.appendChild(modal);
            
                        sectionimg.addEventListener('click', () => {
                            modal.style.display = "block";
                        });
            
                        // Evento de clic para cerrar el modal
                        cancelBtn.addEventListener('click', () => {
                            modal.style.display = "none";
                        });
            
                        // Evento de clic para eliminar la imagen
                        acceptBtn.addEventListener('click', () => {
                            const imgIndex = parseInt(sectionimg.dataset.index, 10);
            
                            // Eliminar la imagen del JSON
                            user.imagenes.splice(imgIndex, 1);
            
                            // Eliminar el elemento de la imagen del DOM
                            sectionimg.remove();
            
                            // Cerrar el modal
                            modal.style.display = "none";
                        });
            
                        // Evento de clic para cerrar el modal si se hace clic fuera de él
                        window.addEventListener('click', (event) => {
                            if (event.target === modal) {
                                modal.style.display = "none";
                            }
                        });
            
                        // Evento de clic para cerrar el modal con el botón de cerrar
                        closeBtn.addEventListener('click', () => {
                            modal.style.display = "none";
                        });
                    });
                }
            }
            
            
            const socialReasonName = document.createElement('h3');
            socialReasonName.textContent = 'Razón social:';
            const socialReason = document.createElement('p');
            socialReason.textContent = `${user.socialReason}`;
            const telephoneTitle = document.createElement('h3');
            telephoneTitle.textContent = 'Teléfono:';
            const telephone = document.createElement('p');
            telephone.textContent = `${user.telephoneNumber}`;
            const whatsappTitle = document.createElement('h3');
            whatsappTitle.textContent = 'WhatsApp:';
            const whatsappNumber = document.createElement('p');
            whatsappNumber.textContent = `${user.whatsappNumber}`;
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = 'Categoría:';
            const category = document.createElement('p');
            category.textContent = `${user.categoriesCompany}`;
            const specializationTitle = document.createElement('h3');
            specializationTitle.textContent = 'Especialización:';
            const specialization = document.createElement('p');
            specialization.textContent = `${user.speciality}`;
            const email = document.createElement('p');
            const emailTitle = document.createElement('h3');
            emailTitle.textContent = 'E-mail:';
            email.textContent = `${user.companyEmail}`;
            const addressTitle = document.createElement('h3');
            addressTitle.textContent = 'Dirección:';
            const address = document.createElement('p');
            address.textContent = `${user.companyAddress}`;
            const descriptionTitle = document.createElement('h3');
            descriptionTitle.textContent = 'Descripción:';
            const description = document.createElement('p');
            description.textContent = `${user.comment}`;
            // Agremamos la imagen al lugar correspondiente.
            welcome.appendChild(welcomeName);
            logoContainer.appendChild(imgLogo);
            ourPhotos();
            socialReasonContainer.appendChild(socialReasonName);
            socialReasonContainer.appendChild(socialReason);
            companyTelephoneContainer.appendChild(telephoneTitle);
            companyTelephoneContainer.appendChild(telephone);
            companyWhatsappContainer.appendChild(whatsappTitle);
            companyWhatsappContainer.appendChild(whatsappNumber);
            companyCategoryContainer.appendChild(categoryTitle);
            companyCategoryContainer.appendChild(category);
            companySpecializationContainer.appendChild(specializationTitle);
            companySpecializationContainer.appendChild(specialization);
            companyEmailContainer.appendChild(emailTitle);
            companyEmailContainer.appendChild(email);
            companyAddressContainer.appendChild(addressTitle);
            companyAddressContainer.appendChild(address);
            commentContainer.appendChild(descriptionTitle);
            commentContainer.appendChild(description);
        }
        else {
            perfilWarning.textContent = 'User not found.';
        }
    }
    catch (error) {
        console.error('Error loading company profiles:', error);
        perfilWarning.textContent = 'Error loading company profiles.';
    }
    
});
