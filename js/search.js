document.addEventListener("DOMContentLoaded", async () => {
    const URL = "https://m25mvnsk-3000.use2.devtunnels.ms/companyName";
    const profilesContainer = document.querySelector('#companySearchContainer');
    const cityFilter = localStorage.getItem('city');
    const specialFilter = localStorage.getItem('speciality');
    const buttonsPage = document.querySelector('#buttonsPage')

    const itemsPerPage = 4;
    let currentPage = 1;
    let users = [];

    try {
        const response = await fetch(URL);
        users = await response.json();

        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        filterAndDisplayUsers();
    } catch (error) {
        console.error('Error cargando perfiles de usuario:', error);
        profilesContainer.textContent = "Error cargando perfiles de usuario.";
    }

    function filterAndDisplayUsers() {
        const filteredUsers = users.filter(user => {
            return user.city === cityFilter || user.speciality === specialFilter;
        });
        profilesContainer.innerHTML = '';

        if (filteredUsers.length > 0) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

            paginatedUsers.forEach(user => {
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('profile');

                const imgElement = document.createElement('img');
                imgElement.src = `data:image/png;base64,${user.image}`;
                imgElement.alt = `${user.responsableName} ${user.responsableLastName}`;
                imgElement.classList.add('profileImage');

                const nameElement = document.createElement('h2');
                nameElement.textContent = `${user.responsableName} ${user.responsableLastName}`;

                const description = document.createElement('p');
                description.textContent = `${user.comment}`;

                const emailElement = document.createElement('button');
                emailElement.classList.add("buttonEmail");
                emailElement.innerHTML = `<a target="_blank" href="mailto:${user.companyEmail}">Enviar E-mail</a>`;

                const contactWhatsapp = document.createElement('button');
                contactWhatsapp.classList.add("buttonWhatsapp");
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

                if (user.imagenes && user.imagenes.length > 0) {
                    user.imagenes.forEach((imagenBase64, index) => {
                        if (index < 6) {
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

                const modal = document.createElement('div');
                modal.classList.add('modal');

                const modalContent = document.createElement('div');
                modalContent.classList.add('modal-content');

                const closeBtn = document.createElement('span');
                closeBtn.classList.add('close');
                closeBtn.innerHTML = '&times;';
                
                const companyNameModal = document.createElement('h2');
                companyNameModal.classList.add('modalTitle');
                companyNameModal.textContent = `${user.socialReason}`

                modalContent.appendChild(closeBtn);
                modalContent.appendChild(companyNameModal);
                modalContent.appendChild(description);
                modalContent.appendChild(emailElement);
                modalContent.appendChild(contactWhatsapp);
                modal.appendChild(modalContent);
                profileDiv.appendChild(modal);

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


                let operacion = 0;
                let counter = 0;
                const widthImg = 100;


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


                setInterval(() => {
                    moveToRight();
                }, 5000);


                containerCarousel.addEventListener('click', () => {
                    modal.style.display = "block";
                });


                closeBtn.addEventListener('click', () => {
                    modal.style.display = "none";
                });


                window.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                });
            });

            buttonsPage.classList.add('buttonsPage')
            addPaginationControls(filteredUsers.length, buttonsPage);
        } else {
            buttonsPage.profilesContainer.textContent = "Usuario no encontrado.";
        }
    }

    function addPaginationControls(totalItems, container) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);

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
