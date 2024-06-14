async function fetchAtletaPorId(id) {
    try {
      const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar atleta');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }
  
  function createButton() {
    const button = document.createElement('button');
    button.innerHTML = 'Voltar';
    button.style.gridArea = 'a8';
    button.style.padding = '1rem';
    button.style.border = '2px solid white';
    button.style.margin = '1rem';
    button.style.borderRadius = '5px';
    button.style.color = 'white';
    button.style.backgroundColor = 'none';
    button.style.cursor = 'pointer';
    button.style.zIndex = '999';
    button.onclick = () => window.location.href = 'jogadores.html';
    return button;
  }
  
  function createCard(atleta) {
    const divCard = document.createElement('article');
    divCard.id = 'card';
  
    const imagem = document.createElement('img');
    imagem.style.gridArea = 'a1';
    imagem.style.height = 'fit-content';
    imagem.style.width = 'fit-content';
    imagem.style.objectFit = 'cover';
    imagem.style.margin = 'auto auto';
    imagem.src = atleta.imagem;
    imagem.alt = atleta.nome;
  
    const titulo = document.createElement('section');
    titulo.style.gridArea = 'a2';
    titulo.style.display = 'flex';
    titulo.style.flexDirection = 'column';
    titulo.style.alignItems = 'center';
    titulo.style.justifyContent = 'center';
  
    const pPosicao = document.createElement('p');
    pPosicao.style.fontWeight = 'bold';
    pPosicao.style.fontFamily = 'sans-serif';
    pPosicao.style.fontSize = '1rem';
    pPosicao.style.textTransform = 'uppercase';
    pPosicao.innerHTML = atleta.posicao;
  
    const pNome = document.createElement('p');
    pNome.style.fontWeight = 'bold';
    pNome.style.fontFamily = 'sans-serif';
    pNome.style.fontSize = '1.3rem';
    pNome.style.padding = '1rem';
    pNome.style.textTransform = 'uppercase';
    pNome.innerHTML = atleta.nome;
  
    const pDescri = document.createElement('p');
    pDescri.style.gridArea = 'a3';
    pDescri.style.padding = '1rem';
    pDescri.innerHTML = atleta.detalhes;
  
    const pNasci = document.createElement('p');
    pNasci.style.gridArea = 'a5';
    pNasci.style.padding = '1rem';
    pNasci.innerHTML = `Data de Nascimento: ${atleta.nascimento}`;
  
    const pJogos = document.createElement('p');
    pJogos.style.gridArea = 'a4';
    pJogos.style.padding = '1rem';
    pJogos.innerHTML = `Partidas Jogadas: ${atleta.n_jogos}`;
  
    const pNatu = document.createElement('p');
    pNatu.style.gridArea = 'a6';
    pNatu.style.padding = '1rem';
    pNatu.innerHTML = `Naturalidade: ${atleta.naturalidade}`;
  
    const pExtra = document.createElement('p');
    pExtra.style.padding = '1rem';
    pExtra.style.gridArea = 'a7';
  
    divCard.append(imagem, titulo, pDescri, pJogos, pNatu, pNasci, pExtra, createButton());
  
    document.body.appendChild(divCard);
  }
  
  function showError(message) {
    const erro = document.createElement('h1');
    erro.style.color = 'white';
    erro.innerHTML = message;
    document.body.append(createButton(), erro);
  }
  
  function init() {
    if (sessionStorage.getItem('logado')) {
      const url = new URLSearchParams(window.location.search);
      const idAtleta = url.get('id');
  
      if (idAtleta) {
        if (idAtleta > 60) {
          showError('Jogador com ID não encontrado');
        } else {
          fetchAtletaPorId(idAtleta)
            .then(atleta => createCard(atleta))
            .catch(() => showError('Erro ao tentar buscar atleta'));
        }
      } else {
        showError('ID do atleta não fornecido');
      }
    } else {
      const deslogado = document.createElement('h1');
      deslogado.innerHTML = 'Acesso negado, faça login para acessar essa página';
      document.body.appendChild(deslogado);
    }
  }
  
  document.addEventListener('DOMContentLoaded', init);
  