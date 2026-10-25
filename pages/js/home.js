document.addEventListener("DOMContentLoaded", function () {
    const accountLink = document.getElementById("account-link");
    const accountDropdown = document.getElementById("account-dropdown");
    const accountLabel = document.getElementById("account-label");
    const logoutButton = document.getElementById("logout-button");
    const accountMenu = document.getElementById("account-menu");

    if (!accountLink || !accountDropdown || !logoutButton) {
        return;
    }

    const idUsuario = localStorage.getItem("id_usuario");
    const usuarioLogado = Boolean(idUsuario);

    if (usuarioLogado) {
        accountLink.textContent = "Minha conta";
        accountLink.href = "#";
        accountLabel.textContent = "Minha conta";
    } else {
        accountLink.textContent = "Entrar";
        accountLink.href = "login.html";
        accountDropdown.hidden = true;
    }

    accountLink.addEventListener("click", function (event) {
        if (!usuarioLogado) {
            return;
        }

        event.preventDefault();
        accountDropdown.hidden = !accountDropdown.hidden;
    });

    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("id_usuario");
        window.location.href = "login.html";
    });

    document.addEventListener("click", function (event) {
        if (accountMenu && !accountMenu.contains(event.target)) {
            accountDropdown.hidden = true;
        }
    });
});