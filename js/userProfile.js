document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3000/userRegistration";
    const URL2 = "http://localhost:3000/feedback";
    const profilesContainer = document.querySelector('#userProfilePhoto');
    const specificEmailUser = localStorage.getItem('userEmail');
    const userProfilePhoto = document.querySelector('#userProfilePhoto');
    const userProfileName = document.querySelector('#userProfileName');
    const userComments = document.getElementById('commentText');
    const buttonSubmit = document.getElementById('buttonSubmit');
    const stars = document.querySelectorAll('.star');
    let currentRating = 0;
    let userName = ''; // Variable to store the user's name
    let imgElement; // Declare imgElement outside the try block

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        const filteredUsers = users.filter(user => user.email === specificEmailUser);

        if (filteredUsers.length > 0) {
            const user = filteredUsers[0];
            userName = `${user.name} ${user.lastNames}`; // Store the user's name
            imgElement = document.createElement('img');
            imgElement.src = `data:image/png;base64,${user.image}`;
            imgElement.alt = `${user.name} ${user.lastNames}`;
            imgElement.classList.add('profileImage');

            const nameElement = document.createElement('h1');
            nameElement.textContent = userName;

            userProfilePhoto.appendChild(imgElement);
            userProfileName.appendChild(nameElement);
        } else {
            profilesContainer.textContent = "User not found.";
        }
    } catch (error) {
        console.error('Error loading user profiles:', error);
        profilesContainer.textContent = "Error loading user profiles.";
    }

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            resetStars();
            currentRating = index + 1;
            updateStars(currentRating);
        });

        star.addEventListener('mouseover', () => {
            resetStars();
            updateStars(index + 1);
        });

        star.addEventListener('mouseout', () => {
            updateStars(currentRating);
        });
    });

    function resetStars() {
        stars.forEach(star => star.classList.remove('active'));
    }

    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    buttonSubmit.addEventListener("click", async (event) => {
        event.preventDefault();
        const userImages = [
            document.getElementById('userImage1').style.backgroundImage.slice(5, -2),
            document.getElementById('userImage2').style.backgroundImage.slice(5, -2),
            document.getElementById('userImage3').style.backgroundImage.slice(5, -2)
        ];
        const feedback = {
            userName: userName,
            profilePhoto: imgElement.src, // Ensure this is the src of the image
            rating: currentRating,
            comments: userComments.value,
            images: userImages
        };

        try {
            const response = await fetch(URL2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            });
            if (response.ok) {
                console.log('Feedback enviado correctamente');
                redirect();
            } else {
                console.error('Error al enviar el feedback');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    });

    function redirect() {
        window.location.href = '../index.html';
    }
});

function mostrarImagen(input, divId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const divElement = document.getElementById(divId);
            divElement.style.backgroundImage = `url('${e.target.result}')`;
            divElement.style.backgroundSize = 'cover'; // Ensure the image covers the container
            divElement.style.backgroundPosition = 'center'; // Center the image in the container
        }

        reader.readAsDataURL(input.files[0]);
    }
}
