// ==========================================
// CONFIGURAÇÃO DA API
// ==========================================

const API_URL = "http://localhost:3000/api";


// ==========================================
// ELEMENTOS
// ==========================================

const loginForm =
    document.getElementById("loginForm");

const loginButton =
    document.getElementById("loginButton");

const message =
    document.getElementById("message");


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        // ======================================
        // PEGAR VALORES
        // ======================================

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const password =
            document
                .getElementById("password")
                .value;


        const remember =
            document
                .getElementById("remember")
                .checked;


        // ======================================
        // LIMPAR MENSAGEM
        // ======================================

        esconderMensagem();


        // ======================================
        // VALIDAÇÃO
        // ======================================

        if (!email || !password) {

            mostrarErro(
                "Informe seu e-mail e senha."
            );

            return;
        }


        // ======================================
        // DESABILITAR BOTÃO
        // ======================================

        loginButton.disabled = true;

        loginButton.textContent =
            "Entrando...";


        // ======================================
        // ENVIAR PARA O BACK-END
        // ======================================

        try {

            const response = await fetch(
                `${API_URL}/login`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        email: email,

                        senha: password

                    })

                }
            );


            const data =
                await response.json();


            // ==================================
            // ERRO
            // ==================================

            if (!response.ok) {

                mostrarErro(
                    data.mensagem ||
                    "E-mail ou senha inválidos."
                );

                return;
            }


            // ==================================
            // LOGIN REALIZADO
            // ==================================

            mostrarSucesso(
                "Login realizado com sucesso!"
            );


            // ==================================
            // SALVAR TOKEN
            // ==================================

            if (data.token) {

                if (remember) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                } else {

                    sessionStorage.setItem(
                        "token",
                        data.token
                    );

                }

            }


            // ==================================
            // SALVAR CLIENTE
            // ==================================

            if (
                data.cliente &&
                data.cliente.id
            ) {

                localStorage.setItem(
                    "clienteId",
                    data.cliente.id
                );

            }


            // ==================================
            // REDIRECIONAR
            // ==================================

            setTimeout(() => {

                window.location.href =
                    "../onboarding/onboarding.html";

            }, 1000);


        } catch (error) {

            console.error(
                "Erro ao conectar com a API:",
                error
            );


            mostrarErro(
                "Não foi possível conectar ao servidor. Verifique se o back-end está funcionando."
            );


        } finally {

            loginButton.disabled = false;

            loginButton.textContent =
                "Entrar";

        }

    }
);


// ==========================================
// MOSTRAR ERRO
// ==========================================

function mostrarErro(texto) {

    message.textContent = texto;

    message.className =
        "message error";

}


// ==========================================
// MOSTRAR SUCESSO
// ==========================================

function mostrarSucesso(texto) {

    message.textContent = texto;

    message.className =
        "message success";

}


// ==========================================
// ESCONDER MENSAGEM
// ==========================================

function esconderMensagem() {

    message.textContent = "";

    message.className =
        "message";

}
