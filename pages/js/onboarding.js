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

function finalizarOnboarding() {

    localStorage.setItem("onboardingConcluido", "true");

    mostrarEtapa(3);

    console.log("Onboarding concluído!");
}