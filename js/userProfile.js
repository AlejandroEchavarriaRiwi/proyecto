document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3000/userRegistration";
    const URL2 = "http://localhost:3000/feedback";
    const profilesContainer = document.querySelector('#userProfilePhoto');
    const specificEmailUser = localStorage.getItem('userEmail');
    const userProfilePhoto = document.querySelector('#userProfilePhoto');
    const userProfileName = document.querySelector('#userProfileName');
    const UserProfileImg1 = document.getElementById('UserProfileImg1');
    const UserProfileImg2= document.getElementById('UserProfileImg2');
    const UserProfileImg3 = document.getElementById('UserProfileImg3');
    
    // calling the button and the empty div where every user profile is going to give their feedback.
    const buttonSubmit= document.getElementById('buttonSubmit');
    const allRiviews= document.getElementById('allRiviews')



    // adding a listener to the botton and calling each input
    buttonSubmit.addEventListener("click", function(){
        const UserProfileImg1= document.getElementById("UserProfileImg1").files[0];
        const UserProfileImg2= document.getElementById("UserProfileImg2").files[0];
        const UserProfileImg3= document.getElementById("UserProfileImg3").files[0];
        const commentText= document.getElementById("commentText").value; 

        if (UserProfileImg1 && UserProfileImg2 & UserProfileImg3 & commentText ){
            let reader = new FileReader();
            reader.onload = function(event){
                let card= document.createElement("div"); // creating a new div where is going to be each review
                card.classList.add("card");
                card.innerHTML=`
                <div class="photoReviews">
                <h2> aqui esta las imagenes</h2>
                </div>`;

                document.getElementById("allReviews").appendChild(card);

                //saving the profile in local storage
                savingReview(commentText, event.target.result);


            };
            reader.readAsDataURL(photo);
        }

        //function to place in the jason
        function readImage(file, index) {
            let reader = new FileReader();
            reader.onload = function(event) {
                imageSources[index] = event.target.result;
                imagesLoaded++;
                checkImagesLoaded();
            };
            reader.readAsDataURL(file);

            readImage(UserProfileImg1, 0);
            readImage(UserProfileImg2, 1);
            readImage(UserProfileImg3, 2);
        }
        
        function savingReview(comment, imageSources) {
            let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
            let newReview = {
                commentText: commentText,
                images: imageSources
            };

            console.log(reviews)
            reviews.push(newReview);
            localStorage.setItem("reviews",JSON.stringify(reviews));
        }


        
    })
    



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
            sendRatingToJSON(currentRating);
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

// funtion for the stars and rating 
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
// adding the photos for the Review
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

// functioon to add the photos. 
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
});

//Saving the information to the card

    savingReview(commentText, event.target.result);{
        let card = JSON.parse(localStorage.getItem("card")) || [];
        card.push({
            rating:rating,
            commentText:commentText

        })
        localStorage.setItem("card", JSON.stringify(card));
    }

    insertarImagen(UserProfileImg1)
    insertarImagen(UserProfileImg2)
    insertarImagen(UserProfileImg3)

















