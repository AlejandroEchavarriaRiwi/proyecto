document.addEventListener("DOMContentLoaded", () => {
    const city = document.querySelector('#options');
    const speciality = document.querySelector('#options2');
    const form = document.querySelector('#formSearch');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        localStorage.setItem('city', city.value);
        localStorage.setItem('speciality', speciality.value);
        window.location.href = './html/search.html';
    });
});

