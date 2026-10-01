function pegarDados() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let usuario = {
        email: email,
        senha: senha
    }

    console.log(usuario);

    return usuario;
}

async function login(event) {

    event.preventDefault();

    console.log('chamou o login');

    try {
        let usuario = pegarDados();

        console.log("Enviando para o servidor:");
        console.log(usuario);

        const response = await axios.post(
            "http://127.0.0.1:3000/login",
            usuario
        );

        console.log("Resposta do servidor:");
        console.log(response.data);

        if (response.status === 200) {

        const onboardingConcluido = localStorage.getItem("onboardingConcluido");

            if (onboardingConcluido === "true") {
                window.location.href = "home.html";
            } else {
            window.location.href = "onboarding.html";
        }

}

    } catch (error) {
        console.error("ERRO COMPLETO:", error);
        console.error("Resposta do servidor:", error.response);
        console.error("Status:", error.response?.status);
        console.error("Dados do erro:", error.response?.data);

        alert("Erro ao cadastrar usuário.");
    }
}