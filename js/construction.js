document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3000/companyName";
    const profilesContainer = document.querySelector('#userProfiles');
    const specificUserDocument = "document1"; // Documento específico del usuario

    try {
        const response = await fetch(URL);
        const users = await response.json();

        // Filtrar los usuarios que coincidan con el documento específico
        const filteredUsers = users.filter(user => user.categoriesCompany === specificUserDocument);

        if (filteredUsers.length > 0) {
            filteredUsers.forEach(user => {
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('profile');

                // Mostrar la imagen principal del usuario
                const imgElement = document.createElement('img');
                imgElement.src = `data:image/png;base64,${user.image}`;
                imgElement.alt = `${user.responsableName} ${user.responsableLastName}`;
                imgElement.classList.add('profileImage');

                const nameElement = document.createElement('h2');
                nameElement.textContent = `${user.responsableName} ${user.responsableLastName}`;

                const ageElement = document.createElement('p');
                ageElement.textContent = `Age: ${user.age}`;

                profileDiv.appendChild(imgElement);
                profileDiv.appendChild(nameElement);
                profileDiv.appendChild(ageElement);

                // Mostrar las imágenes adicionales del usuario
                if (user.imagenes && user.imagenes.length > 0) {
                    user.imagenes.forEach((imagenBase64, index) => {
                        if (index < 6) { // Limita a 6 imágenes
                            const additionalImgElement = document.createElement('img');
                            additionalImgElement.src = `data:image/png;base64,${imagenBase64}`;
                            additionalImgElement.alt = `${user.responsableName} ${user.responsableLastName} Image ${index + 1}`;
                            additionalImgElement.classList.add('additionalProfileImage');

                            profileDiv.appendChild(additionalImgElement);
                        }
                    });
                }

                profilesContainer.appendChild(profileDiv);
            });
        } else {
            profilesContainer.textContent = "User not found.";
        }
    } catch (error) {
        console.error('Error loading user profiles:', error);
        profilesContainer.textContent = "Error loading user profiles.";
    }
});
