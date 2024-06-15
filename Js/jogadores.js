const buttonsData = [
    { text: 'Feminino', url: 'https://botafogo-atletas.mange.li/2024-1/feminino' },
    { text: 'Masculino', url: 'https://botafogo-atletas.mange.li/2024-1/masculino' },
    { text: 'Elenco Completo', url: 'https://botafogo-atletas.mange.li/2024-1/all' },
    { text: 'Sair', action: () => {
        sessionStorage.removeItem('logado');
        window.location.href = 'index.html';
    }}
];

let listaJogadores = [];

async function loadPlayerData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }
        listaJogadores = await response.json();
        renderPlayerList(listaJogadores);
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        renderPlayerList([]);
    }
}

function renderPlayerList(players) {
    const container = document.getElementById('myContainer');
    container.innerHTML = '';
    players.forEach(player => {
        const card = createPlayerCard(player);
        container.appendChild(card);
    });
}

function createPlayerCard(player) {
    const card = document.createElement('article');
    card.classList.add('card');
    card.addEventListener('click', () => {
        localStorage.setItem('atleta', JSON.stringify(player));
        window.location.href = `detalhes.html?id=${player.id}`;
    });

    card.innerHTML = `
    <img src="${player.imagem}" alt="${player.nome}" style="width: 100%; object-fit: cover; object-position: top;">
    <p style="font-weight: 400; font-size: 1.3rem; text-align: center; color: white; background-color: black; margin: 0;">${player.nome}</p>
`;

    return card;
}

function initializePage() {
    const btnsContainer = document.getElementById('btns');
    buttonsData.forEach(btnData => {
        const button = document.createElement('button');
        button.innerText = btnData.text;
        button.addEventListener('click', () => {
            if (btnData.url) {
                loadPlayerData(btnData.url);
            } else {
                btnData.action();
            }
        });
        btnsContainer.appendChild(button);
    });

    loadPlayerData('https://botafogo-atletas.mange.li/2024-1/all');

    const inputPesquisa = document.getElementById('inputPesquisa');
    inputPesquisa.addEventListener('keyup', () => {
        const valor = inputPesquisa.value.trim().toLowerCase();
        const resultado = listaJogadores.filter(jogador =>
            jogador.nome.toLowerCase().includes(valor) ||
            (jogador.nome_completo && jogador.nome_completo.toLowerCase().includes(valor))
        );
        renderPlayerList(resultado);
    });
}

if (sessionStorage.getItem('logado')) {
    initializePage();
} else {
    document.body.innerHTML = '<h1>Acesso negado, faça login para acessar essa página</h1>';
}
