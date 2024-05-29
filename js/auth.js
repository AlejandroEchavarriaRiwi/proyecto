// auth.js
(() => {

    const isAuthenticated = localStorage.getItem("isAuthenticated");

    const path = window.location.pathname;

    const routeActu = path.substring(path.lastIndexOf("/") + 1);

    const privateRoutes = ["userProfile.html", "companyProfile.html"];

    if (privateRoutes.includes(routeActu) && !isAuthenticated) {
        alert("NO TIENES PERMISOS");
        window.location.href = "../index.html";
    }
})();
