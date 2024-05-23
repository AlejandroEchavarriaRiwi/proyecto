document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3000/companyName";
    const welcome = document.querySelector('#showName');
    const mainContainer = document.querySelector('body');
    const perfilWarning = document.querySelector('#logo');
    const logoContainer = document.querySelector('#logo');
    const photosContainers = document.querySelectorAll('.companyPhotos');
    const socialReasonContainer = document.querySelector('#companySocialReason');
    const companyTelephoneContainer = document.querySelector('#companyTelephone');
    const companyWhatsappContainer = document.querySelector('#companyWhatsApp');
    const companyCategoryContainer = document.querySelector('#companyCategory');
    const companySpecializationContainer = document.querySelector('#companySpecialization');
    const companyEmailContainer = document.querySelector('#companyEmail');
    const companyAddressContainer = document.querySelector('#companyAddress');
    const commentContainer = document.querySelector('#companyComment');
    const userMail = localStorage.getItem('userEmail');

    try {
        const response = await fetch(URL);
        const userCompany = await response.json();
        const filteredCompany = userCompany.filter(user => user.companyEmail === userMail);
        if (filteredCompany.length > 0) {
            const user = filteredCompany[0];

            const welcomeName = document.createElement('h4');
            welcomeName.textContent = `${user.responsableName} ${user.responsableLastName}`;
            const imgLogo = document.createElement('img');
            imgLogo.src = `data:image/png;base64,${user.image}`;
            imgLogo.alt = `${user.responsableName} ${user.responsableLastName}`;
            imgLogo.classList.add('imgLogo');
            logoContainer.appendChild(imgLogo);

            // Modal para editar el logo
            const logoModal = document.createElement('div');
            logoModal.classList.add('modal');

            const logoModalContent = document.createElement('div');
            logoModalContent.classList.add('modal-content');

            const logoCloseBtn = document.createElement('span');
            logoCloseBtn.classList.add('close');
            logoCloseBtn.innerHTML = '&times;';
            const logoEditText = document.createElement('h2');
            logoEditText.textContent = 'Editar Logo';
            const logoInputFile = document.createElement('input');
            logoInputFile.type = 'file';
            logoInputFile.accept = 'image/*';
            const logoSaveBtn = document.createElement('button');
            logoSaveBtn.textContent = 'Guardar';
            logoSaveBtn.classList.add('saveButton');

            logoModalContent.appendChild(logoCloseBtn);
            logoModalContent.appendChild(logoEditText);
            logoModalContent.appendChild(logoInputFile);
            logoModalContent.appendChild(logoSaveBtn);
            logoModal.appendChild(logoModalContent);
            mainContainer.appendChild(logoModal);

            imgLogo.addEventListener('click', () => {
                logoModal.style.display = "block";
            });

            logoCloseBtn.addEventListener('click', () => {
                logoModal.style.display = "none";
            });

            logoSaveBtn.addEventListener('click', async () => {
                const file = logoInputFile.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                        user.image = base64String;

                        const updateResponse = await fetch(`${URL}/${user.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(user)
                        });

                        if (updateResponse.ok) {
                            imgLogo.src = `data:image/png;base64,${base64String}`;
                            logoModal.style.display = "none";
                        } else {
                            console.error('Error actualizando el logo de la compañía');
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });

            window.addEventListener('click', (event) => {
                if (event.target === logoModal) {
                    logoModal.style.display = "none";
                }
            });

            function ourPhotos() {
                if (user.imagenes && user.imagenes.length > 0) {
                    user.imagenes.slice(0, 6).forEach((imagenBase64, index) => {
                        const sectionimg = document.createElement('section');
                        sectionimg.classList.add('slider-section');
                        sectionimg.dataset.index = index;

                        const additionalImgElement = document.createElement('img');
                        additionalImgElement.src = `data:image/png;base64,${imagenBase64}`;
                        additionalImgElement.alt = `${user.responsableName} ${user.responsableLastName} Image ${index + 1}`;
                        additionalImgElement.classList.add('additionalProfileImage');
                        sectionimg.appendChild(additionalImgElement);

                        const targetContainer = photosContainers[index % photosContainers.length];
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
                        acceptBtn.textContent = 'Sí';
                        const cancelBtn = document.createElement('button');
                        cancelBtn.classList.add('cancelBtn');
                        cancelBtn.textContent = 'No';
                        const editBtn = document.createElement('button');
                        editBtn.classList.add('editBtn');
                        editBtn.textContent = 'Editar';
                        const alertText = document.createElement('h2');
                        alertText.textContent = '¿Deseas eliminar o editar la imagen?';

                        modalContent.appendChild(closeBtn);
                        modalContent.appendChild(alertText);
                        modalContent.appendChild(acceptBtn);
                        modalContent.appendChild(cancelBtn);
                        modalContent.appendChild(editBtn);
                        modal.appendChild(modalContent);
                        mainContainer.appendChild(modal);

                        sectionimg.addEventListener('click', () => {
                            modal.style.display = "block";
                        });

                        cancelBtn.addEventListener('click', () => {
                            modal.style.display = "none";
                        });

                        acceptBtn.addEventListener('click', async () => {
                            const imgIndex = parseInt(sectionimg.dataset.index, 10);

                            user.imagenes.splice(imgIndex, 1);

                            const updateResponse = await fetch(`${URL}/${user.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(user)
                            });

                            if (updateResponse.ok) {
                                sectionimg.remove();
                                modal.style.display = "none";
                            } else {
                                console.error('Error actualizando el perfil de la compañía');
                            }
                        });

                        editBtn.addEventListener('click', () => {
                            const imgIndex = parseInt(sectionimg.dataset.index, 10);

                            const inputFile = document.createElement('button');
                            inputFile.textContent = 'Cambiar logo'
                            inputFile.classList.add('changeLogoButton');


                            logoContainer.appendChild(imgIndex);
                            logoContainer.appendChild(inputFile);

                            inputFile.addEventListener('change', async (event) => {
                                const file = event.target.files[0];
                                const reader = new FileReader();

                                reader.onloadend = async () => {
                                    const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

                                    user.imagenes[imgIndex] = base64String;

                                    const updateResponse = await fetch(`${URL}/${user.id}`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(user)
                                    });

                                    if (updateResponse.ok) {
                                        additionalImgElement.src = `data:image/png;base64,${base64String}`;
                                        modal.style.display = "none";
                                    } else {
                                        console.error('Error actualizando el perfil de la compañía');
                                    }
                                };

                                reader.readAsDataURL(file);
                            });

                            inputFile.click();
                        });

                        window.addEventListener('click', (event) => {
                            if (event.target === modal) {
                                modal.style.display = "none";
                            }
                        });

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

            const editCompanyInfoButton = document.createElement('button');
            editCompanyInfoButton.textContent = 'Editar Información';
            editCompanyInfoButton.classList.add('editCompanyInfoButton');

            editCompanyInfoButton.addEventListener('click', () => {
                const fields = [
                    { element: socialReason, key: 'socialReason', label: 'Razón social' },
                    { element: telephone, key: 'telephoneNumber', label: 'Teléfono' },
                    { element: whatsappNumber, key: 'whatsappNumber', label: 'WhatsApp' },
                    // { element: category, key: 'categoriesCompany', label: 'Categoría' },
                    // { element: specialization, key: 'speciality', label: 'Especialización' },
                    { element: email, key: 'companyEmail', label: 'E-mail' },
                    { element: address, key: 'companyAddress', label: 'Dirección' },
                    { element: description, key: 'comment', label: 'Descripción' },
                ];

                fields.forEach(field => {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = field.element.textContent;
                    input.placeholder = field.label;
                    field.element.replaceWith(input);
                    field.element = input;
                });

                const saveInfoButton = document.createElement('button');
                saveInfoButton.textContent = 'Guardar Información';
                saveInfoButton.classList.add('saveInfoButton');
                editCompanyInfoButton.replaceWith(saveInfoButton);

                saveInfoButton.addEventListener('click', async () => {
                    fields.forEach(field => {
                        user[field.key] = field.element.value;
                        const p = document.createElement('p');
                        p.textContent = field.element.value;
                        field.element.replaceWith(p);
                        field.element = p;
                    });

                    const updateResponse = await fetch(`${URL}/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    });

                    if (updateResponse.ok) {
                        saveInfoButton.replaceWith(editCompanyInfoButton);
                    } else {
                        console.error('Error actualizando la información de la compañía');
                    }
                });
            });

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
            commentContainer.appendChild(editCompanyInfoButton);
        } else {
            perfilWarning.textContent = 'User not found.';
        }
    } catch (error) {
        console.error('Error loading company profiles:', error);
        perfilWarning.textContent = 'Error loading company profiles.';
    }
});