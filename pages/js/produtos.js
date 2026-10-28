const formularioProduto = document.getElementById('form-produto');
const mensagemProduto = document.getElementById('mensagem-produto');

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
        
        const response = await axios.post("http://localhost:3000/produtos", produto ,{ withCredentials: true });

        mensagemProduto.textContent = response.data.mensagem || 'Produto cadastrado com sucesso!';

        formularioProduto.reset();

    } catch (erro) {
        if (erro.response) {
            mensagemProduto.textContent = erro.response.data.erro || 'Não foi possível cadastrar o produto.';
        } else {
            mensagemProduto.textContent = 'Não foi possível conectar ao servidor.';
        }
    }
});
