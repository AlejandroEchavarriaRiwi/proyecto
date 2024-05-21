document.addEventListener("DOMContentLoaded", async () => {
    const URLUser = 'http://localhost:3000/userRegistration';
    const URLCompany = 'http://localhost:3000/companyName';
    const emailField = document.querySelector('#emailLogInForm');
    const passwordField = document.querySelector('#passwordLogInForm');
    
    if (!emailField || !passwordField) {
        console.error('Email or password field not found in the DOM.');
        return;
    }

    document.querySelector('#logInForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        const specificEmail = emailField.value.trim();
        const specificPassword = passwordField.value.trim();
        
        if (!specificEmail || !specificPassword) {
            console.error('Email or password cannot be empty.');
            return;
        }

        try {
            const responseCompany = await fetch(URLCompany)
            const responseUser = await fetch(URLUser);
            if (!responseUser.ok || !responseCompany.ok) {
                throw new Error('Network response was not ok');
            }
            const company = await responseCompany.json();
            const users = await responseUser.json();
            const filteredCompany = company.find(company => company.companyEmail === specificEmail && company.companyPassword === specificPassword);
            const filteredUser = users.find(user => user.email === specificEmail && user.password === specificPassword);
            if (filteredUser) {
                localStorage.setItem('userEmail', specificEmail); // Save the email in localStorage
                redirect('./../html/userProfile.html');
            } 
            else if (filteredCompany){
                localStorage.setItem('userEmail', specificEmail); // Save the email in localStorage
                redirect('./../html/companyProfile.html');
            }
            else {
                console.error('No matching user found.');
            }
        } catch (error) {
            console.error('Error loading user profiles:', error);
        }
    });

    function redirect(url) {
        window.location.replace(url);
    }
});
