function pegarDados() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let usuario = {
        email: email,
        senha: senha
    };

    console.log(usuario);

    return usuario;
}


async function login(event) {

    event.preventDefault();

    console.log("Chamou o login");

    try {

        const usuario = pegarDados();

        console.log("Enviando para o servidor:");
        console.log(usuario);

        const response = await axios.post(
            "http://127.0.0.1:3000/login",
            usuario
        );

        console.log("Resposta do servidor:");
        console.log(response.data);

        if (response.status === 200) {

            const usuarioLogado = response.data.usuario;

            // Guarda o ID do usuário para o onboarding
            localStorage.setItem(
                "id_usuario",
                usuarioLogado.id_usuario
            );

            // Verifica o status vindo do MySQL
            const onboardingConcluido =
                usuarioLogado.onboarding_concluido == 1;

            console.log(
                "Onboarding concluído:",
                onboardingConcluido
            );

            if (onboardingConcluido) {

                console.log(
                    "Onboarding já concluído. Indo para a Home."
                );

                window.location.href = "home.html";

            } else {

                console.log(
                    "Onboarding ainda não concluído. Indo para o onboarding."
                );

                window.location.href = "onboarding.html";
            }
        }

    } catch (error) {

        console.error("ERRO COMPLETO:", error);
        console.error(
            "Resposta do servidor:",
            error.response
        );
        console.error(
            "Status:",
            error.response?.status
        );
        console.error(
            "Dados do erro:",
            error.response?.data
        );

        alert(
            error.response?.data?.erro ||
            "Erro ao realizar login."
        );
    }
}