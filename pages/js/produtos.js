const formularioProduto = document.getElementById('form-produto');
const mensagemProduto = document.getElementById('mensagem-produto');
const listaProdutos = document.getElementById('lista-produtos');

// Cadastrar produto
formularioProduto.addEventListener('submit', async function (evento) {
    evento.preventDefault();

    const produto = {
        nome: document.getElementById('nome').value.trim(),
        marca: document.getElementById('marca').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        tamanho: document.getElementById('tamanho').value,
        genero_indicado: document.getElementById('genero_indicado').value,
        estilo: document.getElementById('estilo').value.trim(),
        preco_base_brl: Number(document.getElementById('preco_base_brl').value),
        quantidade_estoque: Number(document.getElementById('quantidade_estoque').value),
        status: document.getElementById('status').value
    };

    try {
        const response = await axios.post(
            'http://localhost:3000/produtos',
            produto,
            { withCredentials: true }
        );

        mensagemProduto.textContent =
            response.data.mensagem || 'Produto cadastrado com sucesso!';

        formularioProduto.reset();

        await carregarProdutos();

    } catch (erro) {
        mensagemProduto.textContent = erro.response
            ? erro.response.data.erro || 'Não foi possível cadastrar o produto.'
            : 'Não foi possível conectar ao servidor.';
    }
});



async function carregarProdutos() {
    listaProdutos.textContent = 'Carregando produtos...';

    try {
        const response = await axios.get('http://localhost:3000/produtos',{ withCredentials: true });

        const produtos = response.data;
        listaProdutos.innerHTML = '';

        if (!produtos.length) {
            listaProdutos.textContent = 'Nenhum produto cadastrado.';
            return;
        }

        produtos.forEach(produto => {
            const item = document.createElement('article');
            item.className = 'produto-item';

            const nome = document.createElement('h3');
            nome.textContent = produto.nome;

            const detalhes = document.createElement('p');
            detalhes.textContent =
                `${produto.marca} · Tamanho ${produto.tamanho}`;

            const preco = document.createElement('p');
            preco.textContent =
                `R$ ${Number(produto.preco_base_brl).toFixed(2).replace('.', ',')}`;

            const estoque = document.createElement('p');
            estoque.textContent =
                `Estoque: ${produto.quantidade_estoque} · Status: ${produto.status}`;

            const botoes = document.createElement('div');
            botoes.className = 'acoes-produto';

            const botaoEditar = document.createElement('button');
            botaoEditar.type = 'button';
            botaoEditar.textContent = 'Editar';
            botaoEditar.addEventListener('click', () => {
                editarProduto(produto);
            });

            const botaoDesativar = document.createElement('button');
            botaoDesativar.type = 'button';
            botaoDesativar.textContent = 'Desativar';
            botaoDesativar.disabled = produto.status === 'inativo';

            botaoDesativar.addEventListener('click', () => {
                desativarProduto(produto.id_produto);
            });

            botoes.append(botaoEditar, botaoDesativar);
            item.append(nome, detalhes, preco, estoque, botoes);
            listaProdutos.appendChild(item);
        });

    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
        listaProdutos.textContent =
            'Não foi possível carregar os produtos.';
    }
}


// Carregar automaticamente ao abrir a página
carregarProdutos();

