function pegarDados(){

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
}