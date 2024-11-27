// Aguardar o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {

    // Quando o botão for clicado, chamar a função que faz a requisição
    document.querySelector('form').addEventListener('submit', function(e) {
       console.log("faction ", e)
        e.preventDefault(); // Evitar o envio do formulário por padrão
        criarContato();
        document.querySelector('form').reset(); // Limpar o formulário
    });

    // Função para chamar o endpoint
    async function criarContato() {
        try {
            var nome = document.getElementById('nome').value;
            var email = document.getElementById('email').value;
            var mensagem = document.getElementById('mensagem').value;

            // Fazer a requisição Post para o endpoint (exemplo de API)
            const response = await fetch('http://localhost:3000/contato', {
                method: 'POST',  // ou 'GET', 'PUT', etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, mensagem })
            }); // URL de exemplo

            // Converte a resposta para JSON
            const data = await response.json();  

            // Mostrar o resultado na página
            alert("Sua mensagem foi enviada com sucesso!", data);
        } catch (error) {
            // Se houver um erro, mostrar uma mensagem
            resultadoDiv.innerHTML = 'Erro ao chamar a API: ' + error;
        }
    }

    // Função para chamar o endpoint
    async function listarContatos() {
        try {
            // Fazer a requisição Post para o endpoint (exemplo de API)
            const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // URL de exemplo
            const data = await response.json();  // Converte a resposta para JSON

            // Mostrar o resultado na página
            resultadoDiv.innerHTML = JSON.stringify(data, null, 2);
        } catch (error) {
            // Se houver um erro, mostrar uma mensagem
            resultadoDiv.innerHTML = 'Erro ao chamar a API: ' + error;
        }
    }
});
