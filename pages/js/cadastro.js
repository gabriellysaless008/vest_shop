const dataNascimento = document.getElementById("data_nascimento");

dataNascimento.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");

    if (valor.length > 2) {
        valor = valor.substring(0, 2) + "/" + valor.substring(2);
    }

    if (valor.length > 5) {
        valor = valor.substring(0, 5) + "/" + valor.substring(5, 9);
    }

    this.value = valor;
});

function pegarDados() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let dataNascimento = document.getElementById("data_nascimento").value;
    let senha = document.getElementById("senha").value;
    let confirmaSenha = document.getElementById("confirmaSenha").value;
    let participaProgramaFidelidade = document.getElementById("participa_programa_fidelidade").checked;

    let usuario = {
        nome: nome,
        email: email,
        data_nascimento: dataNascimento,
        senha: senha,
        confirmaSenha: confirmaSenha,
        participa_programa_fidelidade: participaProgramaFidelidade
    };

    console.log(usuario);

    return usuario;
}

async function cadastrar(event) {

    event.preventDefault();

    console.log("Chamou o cadastrar");

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