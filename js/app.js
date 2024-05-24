document.addEventListener("DOMContentLoaded", async () => {
    const URL2 = "http://localhost:3000/feedback";
    const city = document.querySelector('#options');
    const speciality = document.querySelector('#options2');
    const form = document.querySelector('#formSearch');
    const allReviews = document.querySelector('#allReviews'); // Fixed missing quotes

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        localStorage.setItem('city', city.value);
        localStorage.setItem('speciality', speciality.value);
        window.location.href = './html/search.html';
    });

    try {
        const response = await fetch(URL2);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const reviews = await response.json();

        reviews.forEach(review => {
            const ContainerReview = document.createElement("div");
            ContainerReview.classList.add("ContainerReview");

            const userName = review.userName;
            const nameElement = document.createElement("h3");
            nameElement.classList.add("userName");
            nameElement.textContent = userName;

            const imgReviewContainer = document.createElement("div");
            imgReviewContainer.classList.add("imgReviewContainer");

            const imgElement = document.createElement('img');
            imgElement.src = `${review.profilePhoto}`;
            imgElement.alt = review.userName;
            imgElement.classList.add('profileImage'); 
            imgReviewContainer.appendChild(imgElement);

            ContainerReview.appendChild(nameElement);
            ContainerReview.appendChild(imgReviewContainer);

            // Crear el carrusel dentro del bucle forEach
            const containerCarousel = document.createElement('div');
            containerCarousel.classList.add('container-carousel');
            
            const carruseles = document.createElement('div');
            carruseles.classList.add('carruseles');

            const widthImg = 100; // Cada sección ocupa el 100% del contenedor
            let operacion = 0; // Variable para realizar el desplazamiento
            let counter = 0; // Variable para rastrear la posición de la imagen actual en el carrusel

            // Funciones para mover el carrusel
            function moveToRight() {
                counter++;
                if (counter >= review.images.length) {
                    counter = 0;
                    operacion = 0;
                    carruseles.style.transform = `translateX(0)`;
                } else {
                    operacion = operacion + widthImg;
                    carruseles.style.transform = `translateX(-${operacion}%)`;
                }
                carruseles.style.transition = "all ease .6s"; // Agrega una transición suave al desplazamiento
            }

            function moveToLeft() {
                counter--;
                if (counter < 0) {
                    counter = review.images.length - 1;
                    operacion = widthImg * counter;
                    carruseles.style.transform = `translateX(-${operacion}%)`;
                } else {
                    operacion = operacion - widthImg;
                    carruseles.style.transform = `translateX(-${operacion}%)`;
                }
                carruseles.style.transition = "all ease .6s"; // Agrega una transición suave al desplazamiento
            }

            // Eventos de clic para los botones de navegación
            const divRight = document.createElement('div');
            divRight.classList.add('btn-right');
            divRight.addEventListener('click', () => moveToRight());
            containerCarousel.appendChild(divRight);

            const divLeft = document.createElement('div');
            divLeft.classList.add('btn-left');
            divLeft.addEventListener('click', () => moveToLeft());
            containerCarousel.appendChild(divLeft);

            if (review.images && review.images.length > 0) { // Cambiado de user.imagenes a review.imagenes
                review.images.forEach((imagenBase64, index) => { // Cambiado de user.imagenes a review.imagenes
                    if (index < 6) { // Limita a 6 imágenes
                        const sectionimg = document.createElement('section');
                        sectionimg.classList.add('slider-section');

                        const additionalImgElement = document.createElement('img');
                        additionalImgElement.src = `${imagenBase64}`;
                        additionalImgElement.alt = `${review.responsableName} ${review.responsableLastName} Image ${index + 1}`; // Cambiado de user.responsableName a review.responsableName
                        additionalImgElement.classList.add('additionalProfileImage');
                        sectionimg.appendChild(additionalImgElement);

                        carruseles.appendChild(sectionimg);
                    }
                });
            }

            containerCarousel.appendChild(carruseles);
            imgReviewContainer.appendChild(containerCarousel); 

            const userComment = review.comments;
            const comments = document.createElement("p");
            comments.classList.add("comment");
            comments.textContent = userComment;
            ContainerReview.appendChild(comments);

            allReviews.appendChild(ContainerReview);

            // Configurar el desplazamiento automático
            setInterval(() => {
                moveToRight();
            }, 3000); // Desplazamiento cada 3 segundos
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        allReviews.textContent = "Error loading user data.";
    }
});
