function pegarDados() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let perfil = new URLSearchParams(window.location.search).get("perfil");

    let usuario = {
        email: email,
        senha: senha,
        perfil: perfil
    };

    return usuario;
}

async function login(event) {

    event.preventDefault();

    console.log("Chamou o login");

    try {

        const usuario = pegarDados();

        console.log("Enviando para o servidor");

        const response = await axios.post("http://localhost:3000/login", usuario ,{ withCredentials: true });


        console.log("Resposta do servidor:");
        console.log(response.data);

        if (response.status === 200) {

            const usuarioLogado = response.data.usuario;

            // Guarda o ID do usuário para o onboarding
            localStorage.setItem("id_usuario", usuarioLogado.id_usuario);
            localStorage.setItem("tipo_perfil", response.data.usuario.tipo_perfil);

            // Verifica o status vindo do MySQL
            const onboardingConcluido = usuarioLogado.onboarding_concluido == 1;

            console.log("Onboarding concluído:", onboardingConcluido);

            if (onboardingConcluido) {

                console.log("Onboarding já concluído. Indo para a Home.");

                window.location.href = "home.html";

            } else {

                console.log("Onboarding ainda não concluído. Indo para o onboarding.");

                window.location.href = "onboarding.html";
            }
        }

    } catch (error) {

        console.error("ERRO COMPLETO:", error);

        console.error("Resposta do servidor:", error.response);

        console.error("Status:", error.response?.status);

        console.error("Dados do erro:", error.response?.data
        );

        alert(error.response?.data?.erro || "Erro ao realizar login.");
    }
}