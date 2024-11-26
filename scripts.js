document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar o envio do formulário por padrão
    alert("Sua mensagem foi enviada com sucesso!");
    document.querySelector('form').reset(); // Limpar o formulário
});
