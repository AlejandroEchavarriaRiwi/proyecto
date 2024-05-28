document.addEventListener("DOMContentLoaded", async () => {
    const URLUser = 'http://localhost:3000/userRegistration';
    const URLCompany = 'http://localhost:3000/companyName';
    const emailField = document.querySelector('#emailLogInForm');
    const passwordField = document.querySelector('#passwordLogInForm');

    document.querySelector('#logInForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        const specificEmail = emailField.value.trim();
        const specificPassword = passwordField.value.trim();

        if (!specificEmail || !specificPassword) {
            Swal.fire('Error', 'El E-mail o contraseña no pueden estar vacíos.', 'error');
            return;
        }

        try {
            const [responseCompany, responseUser] = await Promise.all([fetch(URLCompany), fetch(URLUser)]);

            if (!responseUser.ok || !responseCompany.ok) {
                Swal.fire('Error', 'No se pudo contactar con el servidor.', 'error');
                return;
            }

            const company = await responseCompany.json();
            const users = await responseUser.json();

            const filteredCompany = company.find(company => company.companyEmail === specificEmail && company.companyPassword === specificPassword);
            const filteredUser = users.find(user => user.email === specificEmail && user.password === specificPassword);

            if (filteredUser) {
                localStorage.setItem("user", true); // set user key true for guardian
                localStorage.setItem('userEmail', specificEmail); // Save the email in localStorage
                Swal.fire('¡Éxito!', 'Inicio de sesión correcto como usuario.', 'success').then(() => {
                    redirect('./../html/userProfile.html');
                });
            } else if (filteredCompany) {
                localStorage.setItem("user", true); // set user key true for guardian
                localStorage.setItem('userEmail', specificEmail); // Save the email in localStorage
                Swal.fire('¡Éxito!', 'Inicio de sesión correcto como empresa.', 'success').then(() => {
                    redirect('./../html/companyProfile.html');
                });
            } else {
                Swal.fire('Error', 'El usuario no está registrado.', 'error');
            }
        } catch (error) {
            if (error.message.includes('404')) {
                Swal.fire('Error', 'El usuario no está registrado.', 'error');
            } else {
                console.error('Error loading user profiles:', error);
                Swal.fire('Error', 'Hubo un error cargando los perfiles: ' + error.message, 'error');
            }
        }
    });

    function redirect(url) {
        window.location.replace(url);
    }
});
