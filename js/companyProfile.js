document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3000/companyName";
    const welcome = document.querySelector('#showName');
    const perfilWarning = document.querySelector('#logo');
    const logoContainer = document.querySelector('#logo');
    const photosContainer = document.querySelector('.companyPhotos');
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
    const userMail = "homecenter@homecenter.com.co"
    try {
        const response = await fetch(URL);
        const userCompany = await response.json();
        const filteredCompany = userCompany.filter(user => user.companyEmail === userMail);
        if (filteredCompany.length > 0) {
            const user = filteredCompany[0];
            // Llamamos la imagen al perfil de la compañia.
            const welcomeName = document.createElement('h3');
            welcomeName.textContent = `${user.responsableName} ${user.responsableLastName}`;
            const imgLogo = document.createElement('img');
            imgLogo.src = `data:image/png;base64,${user.image}`;
            imgLogo.alt = `${user.responsableName} ${user.responsableLastName}`;
            imgLogo.classList.add('imgLogo');
            // La funcion para colocar todas las fotos esta en el JS de construction.js
            const photos = document.createElement('img');
            photos.src = `data:image/png;base64,${user.image}`;
            photos.alt = `${user.responsableName} ${user.responsableLastName}`;
            photos.classList.add('ourphotos');
            const fullName = document.createElement('h2');
            fullName.textContent = `${user.responsableName} ${user.responsableLastName}`;
            const socialReasonName = document.createElement('h3');
            socialReasonName.textContent = 'Razon social:';
            const socialReason = document.createElement('p');
            socialReason.textContent = `${user.socialReason}`;
            const telephoneTitle = document.createElement('h3');
            telephoneTitle.textContent = 'Telefono:';
            const telephone = document.createElement('p');
            telephone.textContent = `${user.telephoneNumber}`;
            const whatsappTitle = document.createElement('h3');
            whatsappTitle.textContent = 'WhatsApp:';
            const whatsappNumber = document.createElement('p');
            whatsappNumber.textContent = `${user.whatsappNumber}`;
            const category = document.createElement('p');
            category.textContent = `${user.categoriesCompany}`;
            const specialization = document.createElement('p');
            specialization.textContent = `${user.speciality}`;
            const email = document.createElement('p');
            email.textContent = `${user.companyEmail}`;
            const address = document.createElement('p');
            address.textContent = `${user.companyAddress}`;
            // Agremamos la imagen al lugar correspondiente.
            welcome.appendChild(welcomeName);
            logoContainer.appendChild(imgLogo);
            photosContainer.appendChild(photos);
            nameContainer.appendChild(fullName);
            socialReasonContainer.appendChild(socialReasonName);
            socialReasonContainer.appendChild(socialReason);
            companyTelephoneContainer.appendChild(telephoneTitle);
            companyTelephoneContainer.appendChild(telephone);
            companyWhatsappContainer.appendChild(whatsappTitle);
            companyWhatsappContainer.appendChild(whatsappNumber);
            companyCategoryContainer.appendChild(category);
            companySpecializationContainer.appendChild(specialization);
            companyEmailContainer.appendChild(email);
            companyAddressContainer.appendChild(address);
        }
        else{
            perfilWarning.textContent = 'User not found.';
        }
    }
        catch (error){
            console.error('Error loading company profiles:', error);
            perfilWarning.textContent = 'Error loading company profiles.';
        }
})