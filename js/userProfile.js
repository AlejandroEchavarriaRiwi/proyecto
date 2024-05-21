document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3000/userRegistration";
    const URL2 = "http://localhost:3000/feedback";
    const profilesContainer = document.querySelector('#userProfilePhoto');
    const specificEmailUser = "carvajaljuliana11@gmail.com";
    const userProfilePhoto = document.querySelector('#userProfilePhoto');
    const userProfileName = document.querySelector('#userProfileName');
    const UserProfileImg1 = document.getElementById('UserProfileImg1');
    const UserProfileImg2= document.getElementById('UserProfileImg2');
    const UserProfileImg3 = document.getElementById('UserProfileImg3');

    console.log(UserProfileImg1);

    const stars = document.querySelectorAll('.star');
    let currentRating = 0;

    try {
        const response = await fetch(URL);
        const users = await response.json();
        const filteredUsers = users.filter(user => user.email === specificEmailUser);

        if (filteredUsers.length > 0) {
            const user = filteredUsers[0];

            const profileDiv = document.createElement('div');
            profileDiv.classList.add('profile');

            const imgElement = document.createElement('img');
            imgElement.src = `data:image/png;base64,${user.image}`;
            imgElement.alt = `${user.responsableName} ${user.responsableLastName}`;
            imgElement.classList.add('profileImage');

            const nameElement = document.createElement('h4');
            nameElement.textContent = `${user.name} ${user.lastNames}`;

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
            // sendRatingToJSON(currentRating);
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

    function sendRatingToJSON(rating) {
        const feedback = {
            rating: rating
        };

        fetch(URL2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        })
        .then(response => {
            if (response.ok) {
                console.log('Calificación enviada correctamente');
            } else {
                console.error('Error al enviar la calificación');
            }
        })
        .catch(error => {
            console.error('Error de red:', error);
        });
    }

UserProfileImg1.addEventListener("click",(event) =>{
   console.log(event.target); 
   const input=event.target.children[0]
   input.click()
  input.addEventListener("change", ()=>{
    insertarImagen(input, UserProfileImg1)
  })

})

UserProfileImg2.addEventListener("click", (event) =>{
    console.log(event.target);
    const input=event.target.children[0]
    input.click()
    input.addEventListener("change",()=>{
        insertarImagen(input,UserProfileImg2)
    })

})

UserProfileImg3.addEventListener("click", (event)=>{
    console.log(event.target);
    const input= event.target.children[0]
    input.click()
    input.addEventListener("change",()=>{
        insertarImagen(input,UserProfileImg3)
    })
})

    function insertarImagen(inputElement, divSelector) {
        const files = inputElement.files[0];
        if (files) {
          const reader = new FileReader();
          reader.onload = function(event) {
            const img = document.createElement("img");
            img.src = event.target.result;
             divSelector.style.backgroundImage="none"
             img.style.backgroundImage="none"
             divSelector.style.background="none"
         img.classList.add("userImage")
            divSelector.innerHTML = ''; // Limpiar el contenido previo del divSelector
            divSelector.appendChild(img);
          };
          reader.readAsDataURL(files);
     console.log(reader);
        }
      }

    insertarImagen(UserProfileImg1)
    insertarImagen(UserProfileImg2)
    insertarImagen(UserProfileImg3)

});














