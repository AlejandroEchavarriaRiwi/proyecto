document.addEventListener("DOMContentLoaded", async () => {
    const URL2 = "http://localhost:3000/feedback";
    const allReviews = document.querySelector('#allReviews');

    try {
        const response = await fetch(URL2);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const reviews = await response.json();

        // Obtener 3 reseñas aleatorias
        const randomReviews = getRandomReviews(reviews, 3);

        randomReviews.forEach(review => {
            const ContainerReview = document.createElement("div");
            ContainerReview.classList.add("ContainerReview");

            const companyName = review.companyName;
            const company = document.createElement("h3");
            company.classList.add("company");
            company.textContent = companyName;
            ContainerReview.appendChild(company);

            const imgReviewContainer = document.createElement("div");
            imgReviewContainer.classList.add("imgReviewContainer");

            const imgElement = document.createElement('img');
            imgElement.src = `${review.profilePhoto}`;
            imgElement.alt = review.userName;
            imgElement.classList.add('profileImage');
            imgReviewContainer.appendChild(imgElement);

            const rating = review.rating;
            const starContainer = document.createElement("div");
            starContainer.className = "starContainer";

            function generateStars(rating) {
                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('span');
                    star.textContent = i < rating ? '★' : '☆';
                    star.className = 'star';
                    starContainer.appendChild(star);
                }
            }

            generateStars(rating);
            imgReviewContainer.appendChild(starContainer);

            const containerCarousel = document.createElement('div');
            containerCarousel.classList.add('container-carousel');

            const carruseles = document.createElement('div');
            carruseles.classList.add('carruseles');

            const widthImg = 100;
            let operacion = 0;
            let counter = 0;

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
                carruseles.style.transition = "all ease .6s";
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
                carruseles.style.transition = "all ease .6s";
            }

            const divRight = document.createElement('div');
            divRight.classList.add('btn-right');
            divRight.addEventListener('click', () => moveToRight());
            containerCarousel.appendChild(divRight);

            const divLeft = document.createElement('div');
            divLeft.classList.add('btn-left');
            divLeft.addEventListener('click', () => moveToLeft());
            containerCarousel.appendChild(divLeft);

            if (review.images && review.images.length > 0) {
                review.images.forEach((imagenBase64, index) => {
                    if (index < 6) {
                        const sectionimg = document.createElement('section');
                        sectionimg.classList.add('slider-section');

                        const additionalImgElement = document.createElement('img');
                        additionalImgElement.src = `${imagenBase64}`;
                        additionalImgElement.alt = `${review.responsableName} ${review.responsableLastName} Image ${index + 1}`;
                        additionalImgElement.classList.add('additionalProfileImage');
                        sectionimg.appendChild(additionalImgElement);

                        carruseles.appendChild(sectionimg);
                    }
                });
            }

            containerCarousel.appendChild(carruseles);
            imgReviewContainer.appendChild(containerCarousel);
            ContainerReview.appendChild(imgReviewContainer);

            const userName = review.userName;
            const nameElement = document.createElement("h3");
            nameElement.classList.add("userName");
            nameElement.textContent = userName;

            ContainerReview.appendChild(nameElement);

            const userComment = review.comments;
            const comments = document.createElement("p");
            comments.classList.add("comment");
            comments.textContent = userComment;

            if (comments.clientHeight < comments.scrollHeight) {
                const seeMore = document.createElement("span");
                seeMore.classList.add("see-more");
                seeMore.textContent = "Ver más";
                comments.appendChild(seeMore);

                seeMore.addEventListener('click', () => {
                    comments.classList.toggle("more");
                    if (comments.classList.contains("more")) {
                        seeMore.textContent = "Ver menos";
                    } else {
                        seeMore.textContent = "Ver más";
                    }
                });
            }

            ContainerReview.appendChild(comments);
            allReviews.appendChild(ContainerReview);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        allReviews.textContent = "Error loading user data.";
    }
});

// Función para obtener una cantidad específica de reseñas aleatorias
function getRandomReviews(reviews, count) {
    const shuffled = reviews.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
