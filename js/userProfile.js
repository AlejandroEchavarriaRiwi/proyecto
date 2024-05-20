document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3000/userRegistration";
    const profilesContainer = document.querySelector('#userProfilePhoto');
    const specificEmailUser = "carvajaljuliana11@gmail.com";
    const userProfilePhoto = document.querySelector('#userProfilePhoto')
    const userProfileName = document.querySelector('#userProfileName')
    try {
        const response = await fetch(URL);
        const users = await response.json();
        const filteredUsers = users.filter(user => user.email === specificEmailUser);
    
        if (filteredUsers.length > 0) {
        // Tomar el primer usuario de la lista filtrada
        const user = filteredUsers[0];

        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        // Mostrar la imagen principal del usuario
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
});

// Here we can highlight or checked  the stars 
const stars= document.querySelectorAll(".star");

stars.forEach(function(star, index) {
    star .addEventListener("click",function(){
        for ( let i =0; i <=index; i++){
            stars [i].classList.add("checked");

        }
        for (let i =index+1; i<stars.length; i++){
            stars[i].classList.remove("checked");
        }

    })
})

