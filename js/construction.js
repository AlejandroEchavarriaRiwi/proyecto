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

                const emailElement = document.createElement('h4')
                emailElement.textContent = `${user.companyEmail}`

                const ageElement = document.createElement('p');
                ageElement.textContent = `Age: ${user.age}`;

                const containerCarousel = document.createElement('div');
                containerCarousel.classList.add('container-carousel');
                containerCarousel.appendChild(imgElement);
                profileDiv.appendChild(containerCarousel);

                const carruseles = document.createElement('div');
                carruseles.classList.add('carruseles');
                containerCarousel.appendChild(carruseles);

                // Mostrar las imágenes adicionales del usuario
                if (user.imagenes && user.imagenes.length > 0) {
                    user.imagenes.forEach((imagenBase64, index) => {
                        if (index < 6) { // Limita a 6 imágenes
                            const sectionimg = document.createElement('section');
                            sectionimg.classList.add('slider-section');

                            const additionalImgElement = document.createElement('img');
                            additionalImgElement.src = `data:image/png;base64,${imagenBase64}`;
                            additionalImgElement.alt = `${user.responsableName} ${user.responsableLastName} Image ${index + 1}`;
                            additionalImgElement.classList.add('additionalProfileImage');
                            sectionimg.appendChild(additionalImgElement);

                            carruseles.appendChild(sectionimg);
                        }
                    });
                }

                // Agregar el modal
                const modal = document.createElement('div');
                modal.classList.add('modal');
                
                const modalContent = document.createElement('div');
                modalContent.classList.add('modal-content');
                
                const closeBtn = document.createElement('span');
                closeBtn.classList.add('close');
                closeBtn.innerHTML = '&times;';
                
                modalContent.appendChild(closeBtn);
                modalContent.appendChild(nameElement);
                modalContent.appendChild(emailElement)
                modal.appendChild(modalContent);
                profileDiv.appendChild(modal);

                // Botones de navegación
                const divRight = document.createElement('div');
                divRight.classList.add('btn-right');
                const iDivRight = document.createElement('i');
                iDivRight.classList.add('bx-chevron-right', 'bx');
                divRight.appendChild(iDivRight);

                const divLeft = document.createElement('div');
                divLeft.classList.add('btn-left');
                const iDivLeft = document.createElement('i');
                iDivLeft.classList.add('bx-chevron-left', 'bx');
                divLeft.appendChild(iDivLeft);

                containerCarousel.appendChild(divLeft);
                containerCarousel.appendChild(divRight);

                profilesContainer.appendChild(profileDiv);

                // Eventos de clic para los botones de navegación
                let operacion = 0;
                let counter = 0;
                const widthImg = 100; // Cada sección ocupa el 100% del contenedor

                divRight.addEventListener('click', () => moveToRight());
                divLeft.addEventListener('click', () => moveToLeft());

                function moveToRight() {
                    if (counter >= carruseles.children.length - 1) {
                        counter = 0;
                        operacion = 0;
                        carruseles.style.transform = `translate(-${operacion}%)`;
                        carruseles.style.transition = "none";
                        return;
                    }
                    counter++;
                    operacion = operacion + widthImg;
                    carruseles.style.transform = `translate(-${operacion}%)`;
                    carruseles.style.transition = "all ease .6s";
                }

                function moveToLeft() {
                    counter--;
                    if (counter < 0) {
                        counter = carruseles.children.length - 1;
                        operacion = widthImg * (carruseles.children.length - 1);
                        carruseles.style.transform = `translate(-${operacion}%)`;
                        carruseles.style.transition = "none";
                        return;
                    }
                    operacion = operacion - widthImg;
                    carruseles.style.transform = `translate(-${operacion}%)`;
                    carruseles.style.transition = "all ease .6s";
                }

                // Auto-mover a la derecha cada 3 segundos
                setInterval(() => {
                    moveToRight();
                }, 5000);

                // Evento de clic para mostrar el modal
                containerCarousel.addEventListener('click', () => {
                    modal.style.display = "block";
                });

                // Evento de clic para cerrar el modal
                closeBtn.addEventListener('click', () => {
                    modal.style.display = "none";
                });

                // Evento de clic para cerrar el modal si se hace clic fuera de él
                window.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                });

            });
        } else {
            profilesContainer.textContent = "Usuario no encontrado.";
        }
    } catch (error) {
        console.error('Error cargando perfiles de usuario:', error);
        profilesContainer.textContent = "Error cargando perfiles de usuario.";
    }
});

