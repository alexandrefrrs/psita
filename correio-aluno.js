
// "Mock" (Nosso banco de dados falso pra testes)
const mockMensagens = [
    { id: 1, assunto: "Falta - Disciplina 3ESD", data: "28/Aug/2026", conteudo: "Registrada(s) 4 falta(s). turno MANHÃ, grade A, período letivo 2026.2" },
    { id: 2, assunto: "Lançamento de Nota", data: "25/Jul/2026", conteudo: "Nota da av1 lançada no sistema." }
];


// Esta função simula a ida até o servidor.
async function buscarMensagensDoBanco() {
    try {
        /* 
        const resposta = await fetch('http://localhost:3000/api/mensagens');
        return await resposta.json(); 
        */

        return mockMensagens;

    } catch (erro) {
        console.error("Erro ao conectar com o banco de dados:", erro);
        return [];
    }
}

async function construirCorreio() {
    const caixaDeEntrada = document.getElementById('caixa-de-entrada');
    const telaLeitura = document.getElementById('tela-leitura');

    // aviso de carregamento enquanto o banco não responde
    caixaDeEntrada.innerHTML = '<p>Buscando mensagens no servidor...</p>';

    const mensagens = await buscarMensagensDoBanco();

    // Limpa o aviso de carregamento
    caixaDeEntrada.innerHTML = '';

    // Se o banco estiver vazio
    if (mensagens.length === 0) {
        caixaDeEntrada.innerHTML = '<p>Nenhuma mensagem encontrada.</p>';
        return;
    }

    // Passa pela lista de mensagens que chegou do banco e cria o HTML
    mensagens.forEach(mensagem => {
        const divItem = document.createElement('div');
        divItem.className = 'item-mensagem';

        divItem.innerHTML = `
            <div style="font-weight: bold; color: rgb(23, 36, 53);">${mensagem.assunto}</div>
            <div style="font-size: 12px; color: #6B7280; margin-top: 5px;">${mensagem.data}</div>
        `;

        divItem.addEventListener('click', function () {
            document.querySelectorAll('.item-mensagem').forEach(item => item.classList.remove('ativa'));
            divItem.classList.add('ativa');

            telaLeitura.innerHTML = `
                <h2 style="color: rgb(23, 36, 53); margin-bottom: 10px;">${mensagem.assunto}</h2>
                <hr style="border: 0; border-top: 1px solid #E5E7EB; margin: 15px 0;">
                <p style="color: #333; line-height: 1.6;">${mensagem.conteudo}</p>
            `;
        });

        caixaDeEntrada.appendChild(divItem);
    });
}

construirCorreio();