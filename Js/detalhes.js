async function fetchAtletaPorId(id) {
  try {
    const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar atleta');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
}

function createButton() {
  const button = document.createElement('button');
  button.textContent = 'Voltar';
  button.onclick = () => window.location.href = 'jogadores.html';
  return button;
}

function createCard(atleta) {
  const detalhesAtleta = document.getElementById('detalhesAtleta');

  const divCard = document.createElement('div');
  divCard.id = 'card'; 
  const img = document.createElement('img');
  img.src = atleta.imagem;
  img.alt = atleta.nome;

  const nome = document.createElement('p');
  nome.textContent = `Nome: ${atleta.nome}`;

  const posicao = document.createElement('p');
  posicao.textContent = `Posição: ${atleta.posicao}`;

  const descricao = document.createElement('p');
  descricao.textContent = atleta.detalhes;

  const nascimento = document.createElement('p');
  nascimento.textContent = `Data de Nascimento: ${atleta.nascimento}`;

  const jogos = document.createElement('p');
  jogos.textContent = `Partidas Jogadas: ${atleta.n_jogos}`;

  const naturalidade = document.createElement('p');
  naturalidade.textContent = `Naturalidade: ${atleta.naturalidade}`;

  divCard.append(img, nome, posicao, descricao, nascimento, jogos, naturalidade, createButton());
  detalhesAtleta.appendChild(divCard);
}

function showError(message) {
  const erro = document.createElement('p');
  erro.textContent = message;
  const detalhesAtleta = document.getElementById('detalhesAtleta');
  detalhesAtleta.appendChild(erro);
  detalhesAtleta.appendChild(createButton());
}

function init() {
  if (sessionStorage.getItem('logado')) {
    const urlParams = new URLSearchParams(window.location.search);
    const idAtleta = urlParams.get('id');

    if (idAtleta) {
      fetchAtletaPorId(idAtleta)
        .then(atleta => createCard(atleta))
        .catch(() => showError('Erro ao tentar buscar atleta'));
    } else {
      showError('ID do atleta não fornecido');
    }
  } else {
    const deslogado = document.createElement('p');
    deslogado.textContent = 'Acesso negado, faça login para acessar essa página';
    const detalhesAtleta = document.getElementById('detalhesAtleta');
    detalhesAtleta.appendChild(deslogado);
  }
}

document.addEventListener('DOMContentLoaded', init);
