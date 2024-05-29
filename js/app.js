document.addEventListener("DOMContentLoaded", async () => {
    // Define the URL for fetching feedback
    const URL2 = "http://localhost:3000/feedback";

    // Get references to HTML elements
    const city = document.querySelector('#options');
    const speciality = document.querySelector('#options2');
    const form = document.querySelector('#formSearch');
    const menu1 = document.querySelector('.menu1');
    const menu2 = document.querySelector('.menu2');
    const menu3 = document.querySelector('.menu3');
    const categories = document.querySelectorAll('.middleMenuButton');
    const allReviews = document.querySelector('#allReviews');
    
    // Variable to store selected category
    let selectedCategory = "";

    // Add event listeners to category buttons
    categories.forEach(category => {
        category.addEventListener('click', () => {
            selectedCategory = category.textContent;
        });
    });

    // Handle search form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        localStorage.setItem('city', city.value);
        localStorage.setItem('speciality', speciality.value);
        window.location.href = './html/search.html';
    });

    // Handle clicks on menu1
    menu1.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.setItem('speciality', selectedCategory);
        window.location.href = './html/construction.html';
    });

    // Handle clicks on menu2
    menu2.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.setItem('speciality', selectedCategory);
        window.location.href = './html/remodeling.html';
    });

    // Handle clicks on menu3
    menu3.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.setItem('speciality', selectedCategory);
        window.location.href = './html/repair.html';
    });

    try {
        // Fetch reviews from the server
        const response = await fetch(URL2);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const reviews = await response.json();

        // Get 3 random reviews
        const randomReviews = getRandomReviews(reviews, 3);

        // Display each random review
        randomReviews.forEach(review => {
            const ContainerReview = document.createElement("div");
            ContainerReview.classList.add("ContainerReview");

            // Add company name
            const company = document.createElement("h3");
            company.classList.add("company");
            company.textContent = review.companyName;
            ContainerReview.appendChild(company);

            // Create a container for the review image and rating
            const imgReviewContainer = document.createElement("div");
            imgReviewContainer.classList.add("imgReviewContainer");

            // Add profile image
            const imgElement = document.createElement('img');
            imgElement.src = `${review.profilePhoto}`;
            imgElement.alt = review.userName;
            imgElement.classList.add('profileImage');
            imgReviewContainer.appendChild(imgElement);

            // Create and add star rating
            const starContainer = document.createElement("div");
            starContainer.className = "starContainer";
            generateStars(review.rating, starContainer);
            imgReviewContainer.appendChild(starContainer);

            // Create carousel for additional images
            const containerCarousel = document.createElement('div');
            containerCarousel.classList.add('container-carousel');

            const carruseles = document.createElement('div');
            carruseles.classList.add('carruseles');

            // Function to move carousel to the right
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

            // Function to move carousel to the left
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

            // Add carousel navigation buttons
            const divRight = document.createElement('div');
            divRight.classList.add('btn-right');
            divRight.addEventListener('click', () => moveToRight());
            containerCarousel.appendChild(divRight);

            const divLeft = document.createElement('div');
            divLeft.classList.add('btn-left');
            divLeft.addEventListener('click', () => moveToLeft());
            containerCarousel.appendChild(divLeft);

            // Add additional images to the carousel
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

            // Append carousel to image review container
            containerCarousel.appendChild(carruseles);
            imgReviewContainer.appendChild(containerCarousel);
            ContainerReview.appendChild(imgReviewContainer);

            // Add user name
            const nameElement = document.createElement("h3");
            nameElement.classList.add("userName");
            nameElement.textContent = review.userName;
            ContainerReview.appendChild(nameElement);

            // Add user comment with "see more" functionality if needed
            const comments = document.createElement("p");
            comments.classList.add("comment");
            comments.textContent = review.comments;

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

// Function to get a specified number of random reviews
function getRandomReviews(reviews, count) {
    const shuffled = reviews.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to generate star rating
function generateStars(rating, starContainer) {
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.textContent = i < rating ? '★' : '☆';
        star.className = 'star';
        starContainer.appendChild(star);
    }
}
