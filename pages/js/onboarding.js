let etapaAtual = 0;

const etapas = [
    document.getElementById("inicio"),
    document.getElementById("etapa1"),
    document.getElementById("etapa2"),
    document.getElementById("etapa3")
];

function mostrarEtapa(numero) {

    etapas.forEach((etapa) => {
        etapa.style.display = "none";
        etapa.setAttribute("aria-hidden", "true");
    });

    etapas[numero].style.display = "block";
    etapas[numero].setAttribute("aria-hidden", "false");

    etapaAtual = numero;

    const titulo = etapas[numero].querySelector("h1");

    if (titulo) {
        titulo.setAttribute("tabindex", "-1");
        titulo.focus();
    }
}

function comecarOnboarding() {
    mostrarEtapa(1);
}

function proximaEtapa() {

    if (etapaAtual < etapas.length - 1) {
        mostrarEtapa(etapaAtual + 1);
    }

}

function voltarEtapa() {

    if (etapaAtual > 1) {
        mostrarEtapa(etapaAtual - 1);
    }

}

async function finalizarOnboarding() {

    const idUsuario = localStorage.getItem("id_usuario");

    console.log("ID do usuário:", idUsuario);

    if (!idUsuario) {

        alert("Usuário não identificado. Faça login novamente.");

        window.location.href = "login.html";

        return;
    }

    try {

        const response = await axios.put(
            `http://127.0.0.1:3000/usuario/${idUsuario}/onboarding`
        );

        console.log("Resposta do servidor:");
        console.log(response.data);

        if (response.status === 200) {

            console.log("Onboarding concluído!");

            mostrarEtapa(3);

        }

    } catch (error) {

        console.error(
            "Erro ao concluir onboarding:",
            error
        );

        console.error(
            "Resposta:",
            error.response?.data
        );

        alert(
            error.response?.data?.erro ||
            "Não foi possível concluir o onboarding."
        );
    }
}