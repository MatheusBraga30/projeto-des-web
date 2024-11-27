// Aguardar o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {
    var idContato = null;

    // Quando o botão for clicado, chamar a função que faz a requisição
    document.querySelector('form').addEventListener('submit', function(e) {
       console.log("faction ", e)
        e.preventDefault(); // Evitar o envio do formulário por padrão

        if (idContato == null) {
            criarContato();
        } else {
            editarContato(idContato);
        }

        idContato = null;
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
            await response.json();  

            listarContatos();

            // Mostrar o resultado na página
            alert("Sua mensagem foi enviada com sucesso!");
        } catch (error) {
            // Se houver um erro, mostrar uma mensagem
            alert("Não foi possível enviar a mensagem!");
        }
    }

    // Função para chamar o endpoint
    async function listarContatos() {
        try {
            // Fazer a requisição Post para o endpoint (exemplo de API)
            const response = await fetch('http://localhost:3000/contato'); // URL de exemplo
            const contatos = await response.json();  // Converte a resposta para JSON

            // Obtendo o corpo da tabela
            const tbody = document.getElementById('dadosTabela').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';

            // Mostrar o resultado na página
            contatos.forEach(contato => {
                // Cria uma nova linha na tabela
                const row = tbody.insertRow();

                // Criar células para cada propriedade
                const celulaNome = row.insertCell(0);
                celulaNome.textContent = contato.nome;

                const celulaEmail = row.insertCell(1);
                celulaEmail.textContent = contato.email;

                const celulaMensagem = row.insertCell(2);
                celulaMensagem.textContent = contato.mensagem;

                // Coluna de Ações
                const cellActions = row.insertCell(3);

                // Botão de edição
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.className = 'edit-btn';
                editButton.onclick = () => editarContatoTela(contato); // Chama a função de edição
                cellActions.appendChild(editButton);

                // Botão de exclusão
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.className = 'delete-btn';
                deleteButton.onclick = () => deletarContato(contato.id); // Chama a função de exclusão
                cellActions.appendChild(deleteButton);
            });
        } catch (error) {
            // Se houver um erro, mostrar uma mensagem
            alert("Não foi encontrado nenhuma mensagem!");
        }
    }

    async function editarContatoTela(contato) {
        document.getElementById('nome').value = contato.nome;
        document.getElementById('email').value = contato.email;
        document.getElementById('mensagem').value = contato.mensagem;
        idContato = contato.id;
    }

    // Função para chamar o endpoint
    async function editarContato(idContato) {
        try {
            var nome = document.getElementById('nome').value;
            var email = document.getElementById('email').value;
            var mensagem = document.getElementById('mensagem').value;

            // Fazer a requisição Post para o endpoint (exemplo de API)
            const response = await fetch('http://localhost:3000/contato/' + idContato, {
                method: 'PUT',  // ou 'GET', 'POST', etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, mensagem })
            }); // URL de exemplo

            // Converte a resposta para JSON
            await response.json();  

            listarContatos();

            // Mostrar o resultado na página
            alert("Sua mensagem foi editada com sucesso!");
        } catch (error) {
            // Se houver um erro, mostrar uma mensagem
            alert("Não foi possível editar a mensagem!");
        }
    }

    // Função para chamar o endpoint
    async function deletarContato(idContato) {
        try {
            // Fazer a requisição Post para o endpoint (exemplo de API)
            const response = await fetch('http://localhost:3000/contato/' + idContato, {
                method: 'DELETE',  // ou 'GET', 'PUT', etc.
                headers: {
                    'Content-Type': 'application/json'
                },
            }); // URL de exemplo

            // Converte a resposta para JSON
            await response.json();

            listarContatos();

            // Mostrar o resultado na página
            alert("Sua mensagem foi deletada com sucesso!");
        } catch (error) {
            // Se houver um erro, mostrar uma mensagem
            alert("Não foi possível deletar a mensagem!");
        }
    }

    // iniciar a tela buscando a lista de  contatos
    window.onload = listarContatos;
});
