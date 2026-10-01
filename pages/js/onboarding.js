let etapaAtual = 0;

function comecarOnboarding() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("etapa1").style.display = "block";
    
    etapaAtual = 1;
    console.log("Foi para a etapa 1");
}


function proximaEtapa() {
    if (etapaAtual === 1) {
        document.getElementById("etapa1").style.display = "none";
        document.getElementById("etapa2").style.display = "block";

        etapaAtual = 2;

        console.log("Está na etapa 2");

    } else if (etapaAtual === 2) {
        document.getElementById("etapa2").style.display = "none";
        document.getElementById("etapa3").style.display = "block";

        etapaAtual = 3;

        console.log("Está na etapa 3");
    }
}



function finalizarOnboarding() {
    localStorage.setItem("onboardingConcluido", "true");

    console.log("Onboarding concluído");

    window.location.href = "home.html";
}
