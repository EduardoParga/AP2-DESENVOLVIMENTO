if (sessionStorage.getItem('logado')) {
    let listaJogadores = []; // Inicializa a lista de jogadores vazia

    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@200..700&display=swap');
        body {
            font-family: 'Lilita One', cursive;
        }
    `;
    document.head.appendChild(style);

    const fetchJson = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    const loadPlayerData = async (url) => {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: fit-content; margin: 0 auto; margin-right: -100px; font-family: 'Roboto', sans-serif">
                <img src="assets/imagens/loading.gif"/>
                <h3>Carregando dados, por favor aguarde...</h3>
            </div>
        `;
        listaJogadores = await fetchJson(url);
        container.innerHTML = '';

        listaJogadores.forEach((jogador) => {
            buildCard(jogador);
        });
    };

    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.flexWrap = 'wrap';
    container.style.gap = '2em';
    container.style.justifyContent = 'center';
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';
    container.id = 'myContainer';

    document.body.appendChild(container);

    const createButton = (text, onClickHandler) => {
        const button = document.createElement('button');
        button.innerHTML = text;
        button.style.padding = '1rem';
        button.style.margin = '0.5rem';
        button.onclick = onClickHandler;
        return button;
    };

    const createImage = (src, alt, styles = {}) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        Object.assign(img.style, styles);
        return img;
    };

    const createTitle = (text) => {
        const h1 = document.createElement('h1');
        h1.innerHTML = text;
        h1.style.color = 'white';
        h1.style.textAlign = 'center';
        h1.style.textTransform = 'uppercase';
        h1.style.margin = '0';
        h1.style.padding = '0';
        return h1;
    };

    const escudo = createImage('Images/escudo.png', 'Escudo', {
        width: '5rem',
        height: '5rem'
    });

    const title = createTitle('Elenco de Atletas');

    const btnFeminino = createButton('Elenco Feminino', () => {
        container.innerHTML = '';
        loadPlayerData('https://botafogo-atletas.mange.li/2024-1/feminino');
    });

    const btnMasculino = createButton('Elenco Masculino', () => {
        container.innerHTML = '';
        loadPlayerData('https://botafogo-atletas.mange.li/2024-1/masculino');
    });

    const btnAll = createButton('Elenco Completo', () => {
        container.innerHTML = '';
        loadPlayerData('https://botafogo-atletas.mange.li/2024-1/all');
    });

    const btnSair = createButton('Sair', () => {
        sessionStorage.removeItem('logado');
        window.location.href = 'index.html';
    });

    const divPesquisa = document.createElement('div');
    divPesquisa.style.textAlign = 'center';
    divPesquisa.style.marginTop = '15px';
    divPesquisa.style.padding = '1rem';

    const inputPesquisa = document.createElement('input');
    inputPesquisa.id = 'inputPesquisa';
    inputPesquisa.placeholder = 'Pesquise por nome';
    inputPesquisa.type = 'text';
    divPesquisa.appendChild(inputPesquisa);

    inputPesquisa.onkeyup = (event) => {
        const valor = event.target.value.trim().toLowerCase(); // Remove espaços e converte para minúsculas
        const resultado = listaJogadores.filter((elemento) =>
            elemento.nome.toLowerCase().includes(valor) || elemento.nome_completo.toLowerCase().includes(valor)
        );
        renderFilteredResults(resultado);
    };

    const renderFilteredResults = (resultado) => {
        container.innerHTML = ''; // Limpa o conteúdo atual do container

        resultado.forEach((jogador) => {
            buildCard(jogador);
        });
    };

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.flexWrap = 'wrap';
    header.style.backgroundColor = 'black';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '1rem';
    header.style.margin = '0';
    header.style.height = 'fit-content';
    header.style.marginBottom = '5px';

    header.appendChild(escudo);
    header.appendChild(title);
    header.appendChild(btnSair);

    const botoes = document.createElement('div');
    botoes.style.display = 'flex';
    botoes.style.height = '4rem';
    botoes.style.justifyContent = 'center';
    botoes.style.marginBottom = '5px';
    botoes.style.gap = '1rem';
    botoes.append(btnFeminino, btnMasculino, btnAll);

    document.body.append(header, botoes, divPesquisa, container);

    const handleClick = (e) => {
        const card = e.target.closest('article');
        const dados = card.dataset;

        Object.keys(dados).forEach((key) => {
            document.cookie = `${key}=${dados[key]}`;
        });

        localStorage.setItem('atleta', JSON.stringify(dados));
        window.location.href = `detalhes.html?id=${dados.id}`;
    };

    const buildCard = (atleta) => {
        const divCard = document.createElement('article');
        divCard.style.display = 'grid';
        divCard.style.width = '220px';
        divCard.style.padding = '.5rem';
        divCard.style.border = '2px solid black';
        divCard.style.borderRadius = '10px';
        divCard.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        divCard.style.background = 'none';
        divCard.style.gridTemplateRows = '20rem 1rem 5rem';
        divCard.style.gridTemplateAreas = "'a1' 'a2' 'a3'";

        Object.assign(divCard.dataset, {
            id: atleta.id,
            descricao: atleta.descricao,
            nome: atleta.nome,
            nomeCompleto: atleta.nome_completo,
            posicao: atleta.posicao,
            imagem: atleta.imagem,
            elenco: atleta.elenco,
            nascimento: atleta.nascimento,
            altura: atleta.altura
        });

        divCard.onclick = handleClick;

        const imagem = createImage(atleta.imagem, atleta.nome, {
            gridArea: 'a1',
            display: 'flex',
            height: '20rem',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'top'
        });

        const pNome = document.createElement('p');
        pNome.style.fontWeight = '400';
        pNome.style.fontSize = '1.3rem';
        pNome.style.textAlign = 'center';
        pNome.style.color = 'white';
        pNome.style.backgroundColor = 'black';
        pNome.style.margin = '0';
        pNome.textContent = atleta.nome;

        divCard.append(imagem, pNome);

        container.appendChild(divCard);
    };

    // Carrega inicialmente todos os jogadores
    loadPlayerData('https://botafogo-atletas.mange.li/2024-1/all');
} else {
    const accessDenied = document.createElement('h1');
    accessDenied.textContent = 'Acesso negado, faça login para acessar essa página';
    document.body.innerHTML = '';
    document.body.appendChild(accessDenied);
}
