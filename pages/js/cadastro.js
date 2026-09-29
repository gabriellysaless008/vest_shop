function pegarDados() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let confirmaSenha = document.getElementById("confirmaSenha").value;

    let usuario = {
        nome: nome,
        email: email,
        senha: senha,
        confirmaSenha: confirmaSenha
    };

    console.log(usuario);

    return usuario;
}

async function cadastrar() {

    event.preventDefault();

    console.log('chamou o cadastrar');

    try {
        let usuario = pegarDados();

        console.log("Enviando para o servidor:");
        console.log(usuario);

        const response = await axios.post(
            "http://127.0.0.1:3000/cadastro",
            usuario
        );

        console.log("Resposta do servidor:");
        console.log(response.data);

    } catch (error) {
        console.error("ERRO COMPLETO:", error);
        console.error("Resposta do servidor:", error.response);
        console.error("Status:", error.response?.status);
        console.error("Dados do erro:", error.response?.data);

        alert("Erro ao cadastrar usuário.");
    }
}