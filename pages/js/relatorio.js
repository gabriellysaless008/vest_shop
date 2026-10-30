// Captura os dados selecionados nos filtros
function pegarDados() {

    let mes = document.getElementById("mes").value;
    let ano = document.getElementById("ano").value;

    let filtros = {
        mes: mes,
        ano: ano
    };

    return filtros;
}


// Evento do formulário
async function consultarRelatorios(event) {

    event.preventDefault();

    console.log("Chamou a consulta de relatórios");

    try {

        const filtros = pegarDados();

        if (!filtros.mes || !filtros.ano) {
            alert("Selecione o mês e o ano para consultar o relatório.");
            return;
        }

        console.log("Enviando filtros para o servidor");

        const response = await axios.get("http://localhost:3000/relatorios", { params: filtros, withCredentials: true });

        console.log("Resposta do servidor:");
        console.log(response.data);

        // Aqui atualizaremos os indicadores e gráficos
        const dados = response.data;

        atualizarIndicadores(dados);
        atualizarGraficoBuscas(dados.produtosMaisBuscados);
        atualizarGraficoCompras(dados.produtosMaisComprados);

    } catch (error) {

        console.error("ERRO COMPLETO:", error);
        console.error("Resposta do servidor:", error.response);
        console.error("Status:", error.response?.status);
        console.error("Dados do erro:", error.response?.data);

        alert(error.response?.data?.erro || "Erro ao carregar os relatórios.");
    }
}


// Conecta o formulário à função
document.getElementById("form-filtros").addEventListener("submit", consultarRelatorios);