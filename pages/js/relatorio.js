// OBS PARA A CORREÇÃO DO PROFESSOR:
// professor eu não se ele ficou com muitas linhas de codigo, mas espero que não tenha fico muito extenso!!

// Elementos dos indicadores
const produtoMaisBuscado = document.getElementById("produto-mais-buscado");
const totalBuscas = document.getElementById("total-buscas");

const produtoMaisComprado = document.getElementById("produto-mais-comprado");
const totalCompras = document.getElementById("total-compras");

const totalUnidades = document.getElementById("total-unidades");

// Elementos dos gráficos
const graficoBuscas = document.getElementById("grafico-buscas");
const graficoCompras = document.getElementById("grafico-compras");

function pegarDados() {

    let mes = document.getElementById("mes").value;
    let ano = document.getElementById("ano").value;

    let filtros = {
        mes: mes,
        ano: ano
    };

    return filtros;
}

// LIMPAR DADOS DOS RELATÓRIOS

function limparRelatorios() {

    produtoMaisBuscado.textContent = "Nenhum produto";
    totalBuscas.textContent = "Nenhuma busca encontrada";

    produtoMaisComprado.textContent = "Nenhum produto";
    totalCompras.textContent = "Nenhuma compra encontrada";

    totalUnidades.textContent = "0";

    graficoBuscas.innerHTML = "";
    graficoCompras.innerHTML = "";
}


 // Atualiza os indicadores
function atualizarIndicadores(dados) {

    if (dados.produtoMaisBuscado) {
        produtoMaisBuscado.textContent = dados.produtoMaisBuscado.nome;
        totalBuscas.textContent = `${dados.produtoMaisBuscado.total} buscas no período`;

    } else {
        produtoMaisBuscado.textContent = "Nenhum produto";
        totalBuscas.textContent = "Nenhuma busca encontrada";
    }

    if (dados.produtoMaisComprado) {
        produtoMaisComprado.textContent = dados.produtoMaisComprado.nome;
        totalCompras.textContent = `${dados.produtoMaisComprado.total} unidades vendidas`;

    } else {
        produtoMaisComprado.textContent = "Nenhum produto";
        totalCompras.textContent = "Nenhuma compra encontrada";
    }

    totalUnidades.textContent = dados.totalUnidades ?? 0;
}


// Atualiza o gráfico de produtos mais buscados
function atualizarGraficoBuscas(produtos) {

    graficoBuscas.innerHTML = "";

    if (!produtos || produtos.length === 0) {
        graficoBuscas.textContent = "Nenhuma busca encontrada neste período.";
        return;
    }

    const maiorValor = Math.max(...produtos.map(produto => Number(produto.total)));

    produtos.forEach(produto => {

        const linha = document.createElement("div");
        linha.className = "barra-linha";

        const nome = document.createElement("span");
        nome.className = "barra-nome";
        nome.textContent = produto.nome;

        const trilho = document.createElement("div");
        trilho.className = "barra-trilho";

        const barra = document.createElement("span");

        barra.style.width = `${(Number(produto.total) / maiorValor) * 100}%`;

        trilho.appendChild(barra);

        const valor = document.createElement("strong");
        valor.textContent = produto.total;

        linha.append(nome, trilho, valor);

        graficoBuscas.appendChild(linha);
    });
}


// Atualiza o gráfico de produtos mais comprados
function atualizarGraficoCompras(produtos) {

    graficoCompras.innerHTML = "";

    if (!produtos || produtos.length === 0) {
        graficoCompras.textContent = "Nenhuma compra encontrada neste período.";
        return;
    }

    const maiorValor = Math.max(...produtos.map(produto => Number(produto.total)));

    produtos.forEach(produto => {

        const linha = document.createElement("div");
        linha.className = "barra-linha";

        const nome = document.createElement("span");
        nome.className = "barra-nome";
        nome.textContent = produto.nome;

        const trilho = document.createElement("div");
        trilho.className = "barra-trilho";

        const barra = document.createElement("span");

        barra.style.width = `${(Number(produto.total) / maiorValor) * 100}%`;

        trilho.appendChild(barra);

        const valor = document.createElement("strong");
        valor.textContent = produto.total;

        linha.append(nome, trilho, valor);

        graficoCompras.appendChild(linha);
    });
}

// Evento do formulário

async function consultarRelatorios(event) {

    event.preventDefault();

    console.log("Chamou a consulta de relatórios");

    try {

        const filtros = pegarDados();

        if (!filtros.mes || !filtros.ano) {
            alert("Selecione o mês e o ano.");
            return;
        }

        limparRelatorios();

        graficoBuscas.textContent = "Gerando relatório...";
        graficoCompras.textContent = "Gerando relatório...";

        console.log("Enviando solicitação para o servidor");

        // Solicita a geração do relatório
        const response = await axios.post("http://localhost:3000/relatorios", filtros, { withCredentials: true });

        console.log("Solicitação recebida:", response.data);

        const idJob = response.data.id_job;

        // Acompanha o processamento
        await acompanharRelatorio(idJob);

    } catch (error) {

        console.error("ERRO COMPLETO:", error);
        console.error("Resposta:", error.response?.data);

        alert(error.response?.data?.erro || "Erro ao solicitar o relatório.");

        graficoBuscas.textContent = "Não foi possível carregar os dados.";
        graficoCompras.textContent = "Não foi possível carregar os dados.";
    }
}


// Consulta o andamento do processamento
async function acompanharRelatorio(idJob) {

    try {

        const response = await axios.get(`http://localhost:3000/relatorios/${idJob}`, {withCredentials: true});

        const tarefa = response.data;

        console.log("Status do relatório:", tarefa.status);

        if (tarefa.status === "concluido") {

            const dados = tarefa.resultado;

            atualizarIndicadores(dados);
            atualizarGraficoBuscas(dados.produtosMaisBuscados);
            atualizarGraficoCompras(dados.produtosMaisComprados);

            console.log("Relatório carregado com sucesso!");

        } else if (tarefa.status === "erro") {

            graficoBuscas.textContent = "Erro ao gerar relatório.";
            graficoCompras.textContent = "Erro ao gerar relatório.";

            alert(tarefa.erro || "Não foi possível gerar o relatório.");

        } else {

            // Continua verificando enquanto estiver pendente ou processando
            graficoBuscas.textContent = "Gerando relatório...";
            graficoCompras.textContent = "Gerando relatório...";

            setTimeout(() => {
                acompanharRelatorio(idJob);
            }, 1000);
        }

    } catch (error) {

        console.error("ERRO AO CONSULTAR O PROCESSAMENTO:", error);

        graficoBuscas.textContent = "Não foi possível consultar o relatório.";
        graficoCompras.textContent = "Não foi possível consultar o relatório.";
    }
}


// Conecta o formulário à função
document.getElementById("form-filtros").addEventListener("submit", consultarRelatorios);


// Conecta o formulário à função
document.getElementById("form-filtros").addEventListener("submit", consultarRelatorios);