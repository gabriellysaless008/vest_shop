document.addEventListener("DOMContentLoaded", function () {

    const accountLink = document.getElementById("account-link");
    const accountDropdown = document.getElementById("account-dropdown");
    const accountLabel = document.getElementById("account-label");
    const logoutButton = document.getElementById("logout-button");
    const accountMenu = document.getElementById("account-menu");

    const gerenciarEquipeLink = document.getElementById("gerenciar-equipe-link");

    if (!accountLink || !accountDropdown || !logoutButton) {
        return;
    }

    const idUsuario = localStorage.getItem("id_usuario");
    const tipoPerfil = localStorage.getItem("tipo_perfil");

    const usuarioLogado = Boolean(idUsuario);

    // Exibe o gerenciamento da equipe somente para Administradores
    if (gerenciarEquipeLink) {

        if (usuarioLogado && tipoPerfil === "administrador") {
            gerenciarEquipeLink.hidden = false;
        } else {
            gerenciarEquipeLink.hidden = true;
        }
    }

    // Verifica se existe usuário logado
    if (usuarioLogado) {
        accountLink.textContent = "Minha conta";
        accountLink.href = "#";
        accountLabel.textContent = "Minha conta";

    } else {
        accountLink.textContent = "Entrar";
        accountLink.href = "login.html";
        accountDropdown.hidden = true;
    }

    // Abre e fecha o menu da conta
    accountLink.addEventListener("click", function (event) {

        if (!usuarioLogado) {
            return;
        }

        event.preventDefault();

        accountDropdown.hidden = !accountDropdown.hidden;
    });

    // Realiza o logout
    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("id_usuario");
        localStorage.removeItem("tipo_perfil");

        window.location.href = "login.html";
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (event) {

        if (accountMenu && !accountMenu.contains(event.target)) {
            accountDropdown.hidden = true;
        }
    });
});
