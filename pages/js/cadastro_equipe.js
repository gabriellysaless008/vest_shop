document.addEventListener("DOMContentLoaded", function () {
const formulario = document.getElementById("form-cadastro-equipe");
const mensagem = document.getElementById("mensagem");
const tipoPerfil = localStorage.getItem("tipo_perfil");

// MÁSCARA DA DATA DE NASCIMENTO

const campoDataNascimento = document.getElementById("data_nascimento");

campoDataNascimento.addEventListener("input", function () {

let valor = campoDataNascimento.value.replace(/\D/g, "");

valor = valor.slice(0, 8);

    if (valor.length > 4) {
        valor = valor.replace(/^(\d{2})(\d{2})(\d{1,4})$/, "$1/$2/$3");

    } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{1,2})$/, "$1/$2");
    }

campoDataNascimento.value = valor;
});

    // Verifica o perfil antes de exibir a funcionalidade
    if (tipoPerfil !== "administrador") {
        formulario.style.display = "none";
        mensagem.textContent = "Acesso permitido somente para Administradores.";
        mensagem.className = "mensagem erro";
        return;
    }


// CADASTRAR FUNCIONÁRIO

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const data_nascimento = document.getElementById("data_nascimento").value.trim();
    const tipo_perfil = document.getElementById("tipo_perfil").value;
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;

    if (senha !== confirmaSenha) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.className = "mensagem erro";
        return;
    }

    const dados = {
        nome,
        email,
        data_nascimento,
        tipo_perfil,
        senha,
        confirmaSenha
    };

    try {
        const response = await axios.post("http://localhost:3000/usuarios/equipe", dados, {withCredentials: true});
        mensagem.textContent = response.data.mensagem;
        mensagem.className = "mensagem sucesso";

        formulario.reset();

            onsole.log("Funcionário cadastrado:", response.data);

    } catch (error) {
        console.error("ERRO AO CADASTRAR FUNCIONÁRIO:", error);
        mensagem.textContent = error.response?.data?.erro || "Não foi possível cadastrar o funcionário.";
        mensagem.className = "mensagem erro";
        }
    });

});
