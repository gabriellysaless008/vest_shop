
const formularioProduto = document.getElementById('form-produto');
const mensagemProduto = document.getElementById('mensagem-produto');
const listaProdutos = document.getElementById('lista-produtos');

let idProdutoEditando = null;


// Cadastrar ou editar produto
formularioProduto.addEventListener('submit', async function (evento) {
    evento.preventDefault();

    const produto = {
        nome: document.getElementById('nome').value.trim(),
        marca: document.getElementById('marca').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        tamanho: document.getElementById('tamanho').value,
        genero_indicado: document.getElementById('genero_indicado').value,
        estilo: document.getElementById('estilo').value.trim(),
        preco_base_brl: Number(
            document.getElementById('preco_base_brl').value
        ),
        quantidade_estoque: Number(
            document.getElementById('quantidade_estoque').value
        ),
        status: document.getElementById('status').value
    };

    try {
        let response;

        if (idProdutoEditando !== null) {
            // Editar produto existente
            response = await axios.put(`http://localhost:3000/produtos/${idProdutoEditando}`, produto, { withCredentials: true });

            mensagemProduto.textContent = response.data.mensagem || 'Produto atualizado com sucesso!';

            idProdutoEditando = null;

        } else {
            // Cadastrar novo produto
            response = await axios.post('http://localhost:3000/produtos', produto, { withCredentials: true });

            mensagemProduto.textContent = response.data.mensagem || 'Produto cadastrado com sucesso!';
        }

        formularioProduto.reset();

        await carregarProdutos();

    } catch (erro) {
        if (erro.response) {
            mensagemProduto.textContent = erro.response.data.erro || 'Não foi possível salvar o produto.';
        } else {
            mensagemProduto.textContent = 'Não foi possível conectar ao servidor.';
        }
    }
});


// Listar produtos do inventário
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
                `R$ ${Number(produto.preco_base_brl)
                    .toFixed(2)
                    .replace('.', ',')}`;

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

        listaProdutos.textContent = 'Não foi possível carregar os produtos.';
    }
}


// Preencher formulário para editar um produto
function editarProduto(produto) {
    idProdutoEditando = produto.id_produto;

    document.getElementById('nome').value = produto.nome;
    document.getElementById('marca').value = produto.marca;
    document.getElementById('descricao').value = produto.descricao || '';
    document.getElementById('tamanho').value = produto.tamanho;
    document.getElementById('genero_indicado').value = produto.genero_indicado || '';
    document.getElementById('estilo').value = produto.estilo;
    document.getElementById('preco_base_brl').value = produto.preco_base_brl;
    document.getElementById('quantidade_estoque').value = produto.quantidade_estoque;
    document.getElementById('status').value = produto.status;

    document.getElementById('cadastro').scrollIntoView({
        behavior: 'smooth'
    });

    mensagemProduto.textContent = 'Altere os campos e envie o formulário para salvar as alterações.';
}


// Desativar produto
async function desativarProduto(idProduto) {
    const confirmar = confirm('Tem certeza que deseja desativar este produto?');

    if (!confirmar) {
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:3000/produtos/${idProduto}`, { withCredentials: true });

        mensagemProduto.textContent = response.data.mensagem || 'Produto desativado com sucesso!';

        await carregarProdutos();

    } catch (erro) {
        if (erro.response) {
            mensagemProduto.textContent = erro.response.data.erro || 'Não foi possível desativar o produto.';
        } else {
            mensagemProduto.textContent = 'Não foi possível conectar ao servidor.';
        }
    }
}


// Carregar produtos automaticamente ao abrir a página
carregarProdutos();
