document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3000/companyName";
    const profilesContainer = document.querySelector('#userProfiles');
    const cityFilter = document.querySelector('#cityFilter');
    const specialFilter = document.querySelector('#specialFilter');
    const companyType = "Construcción"; // tipo de empresa
    const hideButtonC = document.querySelector("#hideButtonC")
    const hideButtonM = document.querySelector("#hideButtonM")

    const itemsPerPage = 10; // Número de empresas por página
    let currentPage = 1;
    let users = [];

    try {
        const response = await fetch(URL);
        users = await response.json();

        // Ordenar los usuarios por fecha de creación en orden descendente
        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Inicialmente mostrar todos los usuarios filtrados por tipo de empresa
        filterAndDisplayUsers();
    } catch (error) {
        console.error('Error cargando perfiles de usuario:', error);
        profilesContainer.textContent = "Error cargando perfiles de usuario.";
    }

    // Añadir eventos de cambio a los filtros
    cityFilter.addEventListener('change', () => {
        currentPage = 1; // Reiniciar a la primera página
        filterAndDisplayUsers();
    });
    specialFilter.addEventListener('change', () => {
        currentPage = 1; // Reiniciar a la primera página
        filterAndDisplayUsers();
    });

    // Crear y añadir el botón de limpiar filtros
    const clearFilterButton = document.createElement('button');
    clearFilterButton.classList.add("DeleatFiltes")
    clearFilterButton.textContent = "Limpiar Filtros";
    clearFilterButton.addEventListener('click', () => {
        cityFilter.value = '';
        specialFilter.value = '';
        currentPage = 1; // Reiniciar a la primera página
        filterAndDisplayUsers();
    });

    // Añadir el botón debajo de los filtros
    const filterButton = document.querySelector("#filterButton")
    filterButton.appendChild(clearFilterButton);

    function filterAndDisplayUsers() {
        // Obtener los valores actuales de los filtros
        const city = cityFilter.value;
        const special = specialFilter.value;

        // Filtrar los usuarios que coincidan con el tipo de empresa y los filtros
        const filteredUsers = users.filter(user => {
            return user.categoriesCompany === companyType &&
                (!city || user.city === city) &&
                (!special || user.speciality === special);
        });

        // Limpiar el contenedor de perfiles
        profilesContainer.innerHTML = '';

        if (filteredUsers.length > 0) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

            paginatedUsers.forEach(user => {
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('profile');

                // Mostrar la imagen principal del usuario
                const imgElement = document.createElement('img');
                imgElement.src = `data:image/png;base64,${user.image}`;
                imgElement.alt = `${user.responsableName} ${user.responsableLastName}`;
                imgElement.classList.add('profileImage');

                const nameElement = document.createElement('h2');
                nameElement.textContent = `${user.responsableName} ${user.responsableLastName}`;

                const description = document.createElement('p');
                description.textContent = `${user.comment}`;

                const emailElement = document.createElement('button');
                emailElement.classList.add("buttonEmail")
                emailElement.innerHTML = `<a target="_blank" href="mailto:${user.companyEmail}">Enviar E-mail</a>`;

                const contactWhatsapp = document.createElement('button');
                contactWhatsapp.classList.add("buttonWhatsapp")
                contactWhatsapp.innerHTML = `<a target="_blank" href="https://api.whatsapp.com/send?phone=${user.whatsappNumber}">Whatsapp</a>`;

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
                modalContent.appendChild(description);
                modalContent.appendChild(emailElement);
                modalContent.appendChild(contactWhatsapp);
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

            // Agregar controles de paginación
            addPaginationControls(filteredUsers.length, hideButtonC);
            addPaginationControls2(filteredUsers.length, hideButtonM);

        } else {
            profilesContainer.textContent = "Usuario no encontrado.";
        }
    }

    function addPaginationControls(totalItems, container) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
    
        // Limpiar el contenedor de paginación antes de agregar nuevos botones
        let paginationContainer = container.querySelector('.pagination');
        if (paginationContainer) {
            paginationContainer.remove();
        }
    
        paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination');
    
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add("pageButton");
            pageButton.textContent = i;
            pageButton.classList.add('page-button');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                filterAndDisplayUsers();
            });
            paginationContainer.appendChild(pageButton);
        }
    
        container.appendChild(paginationContainer);
    }
    
    function addPaginationControls2(totalItems, container) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
    
        // Limpiar el contenedor de paginación antes de agregar nuevos botones
        let paginationContainer = container.querySelector('.pagination');
        if (paginationContainer) {
            paginationContainer.remove();
        }
    
        paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination');
    
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add("pageButton");
            pageButton.textContent = i;
            pageButton.classList.add('page-button');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                filterAndDisplayUsers();
            });
            paginationContainer.appendChild(pageButton);
        }
        container.appendChild(paginationContainer);
    }
});

