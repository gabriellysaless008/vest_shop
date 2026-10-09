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

    const mensagem = document.getElementById("message");

    function mostrarMensagem(texto, sucesso = false) {
        if (mensagem) {
            mensagem.textContent = texto;
            mensagem.style.color = sucesso ? "#287a45" : "#b42318";
            mensagem.style.display = "block";
        } else {
            alert(texto);
        }
    }

    try {
        const usuario = pegarDados();

        // Validar campos obrigatórios
        if (
            !usuario.nome.trim() ||
            !usuario.email.trim() ||
            !usuario.data_nascimento.trim() ||
            !usuario.senha ||
            !usuario.confirmaSenha
        ) {
            mostrarMensagem("Preencha todos os campos obrigatórios.");
            return;
        }

        // Conferir se as senhas são iguais
        if (usuario.senha !== usuario.confirmaSenha) {
            mostrarMensagem("As senhas não coincidem. Confira os dois campos.");
            document.getElementById("confirmaSenha").focus();
            return;
        }

        // Não enviar o campo de confirmação se a API não precisar dele
        const dadosCadastro = {
            nome: usuario.nome.trim(),
            email: usuario.email.trim(),
            data_nascimento: usuario.data_nascimento,
            senha: usuario.senha,
            confirmaSenha: usuario.confirmaSenha,
            participa_programa_fidelidade:
            usuario.participa_programa_fidelidade
        };

        const response = await axios.post(
            "http://127.0.0.1:3000/cadastro",
            dadosCadastro
        );

        console.log("Resposta do servidor:", response.data);

        mostrarMensagem(
            "Cadastro realizado com sucesso! Você será direcionado para o login.",
            true
        );

        // Redirecionar após dar tempo para a pessoa ler a mensagem
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1800);

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        console.error("Resposta do servidor:", error.response?.data);

        if (!error.response) {
            mostrarMensagem(
                "Não foi possível conectar ao servidor. Verifique se ele está funcionando e tente novamente."
            );
            return;
        }

        const status = error.response.status;
        const dadosErro = error.response.data;

        // Usar a mensagem do backend quando ela estiver disponível
        const mensagemServidor =
            typeof dadosErro === "string"
                ? dadosErro
                : dadosErro?.message || dadosErro?.erro;

        if (status === 400) {
            mostrarMensagem(
                mensagemServidor ||
                "Os dados enviados são inválidos. Confira os campos e tente novamente."
            );
        } else if (status === 409) {
            mostrarMensagem(
                mensagemServidor ||
                "Este e-mail já está cadastrado. Tente entrar na sua conta."
            );
        } else if (status >= 500) {
            mostrarMensagem(
                "O servidor encontrou um problema ao cadastrar. Tente novamente mais tarde."
            );
        } else {
            mostrarMensagem(
                mensagemServidor ||
                "Não foi possível concluir o cadastro. Tente novamente."
            );
        }
    }
}