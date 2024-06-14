// Função para buscar dados do atleta por ID
async function fetchAtletaPorId(id) {
    try {
      const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar atleta');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar atleta:', error);
      return null;
    }
  }
  
  // Função para construir os detalhes do atleta na página
  const construirDetalhesAtleta = (atleta) => {
    const detalhesAtleta = document.getElementById('detalhesAtleta');
  
    // Criando elementos HTML para mostrar os detalhes do atleta
    const divCard = document.createElement('article');
    divCard.id = 'card';
  
    const imagem = document.createElement('img');
    imagem.src = atleta.imagem;
    imagem.alt = atleta.nome;
  
    const titulo = document.createElement('h2');
    titulo.textContent = atleta.nome;
  
    const posicao = document.createElement('p');
    posicao.textContent = `Posição: ${atleta.posicao}`;
  
    const descricao = document.createElement('p');
    descricao.textContent = atleta.detalhes;
  
    const nascimento = document.createElement('p');
    nascimento.textContent = `Nascimento: ${atleta.nascimento}`;
  
    const jogos = document.createElement('p');
    jogos.textContent = `Número de jogos: ${atleta.n_jogos}`;
  
    const naturalidade = document.createElement('p');
    naturalidade.textContent = `Naturalidade: ${atleta.naturalidade}`;
  
    const extra = document.createElement('p');
    extra.textContent = `ID: ${atleta.id} | Elenco: ${atleta.elenco} | Altura: ${atleta.altura ? atleta.altura : 'Não informado'}`;
  
    // Adicionando elementos ao divCard
    divCard.appendChild(imagem);
    divCard.appendChild(titulo);
    divCard.appendChild(posicao);
    divCard.appendChild(descricao);
    divCard.appendChild(nascimento);
    divCard.appendChild(jogos);
    divCard.appendChild(naturalidade);
    divCard.appendChild(extra);
  
    // Adicionando divCard ao elemento detalhesAtleta na página
    detalhesAtleta.appendChild(divCard);
  };
  
  // Função principal para carregar os detalhes do atleta
  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idAtleta = urlParams.get('id');
  
    if (idAtleta) {
      fetchAtletaPorId(idAtleta)
        .then(atleta => {
          if (atleta) {
            construirDetalhesAtleta(atleta);
          } else {
            console.error('Atleta não encontrado');
            const erro = document.createElement('h1');
            erro.textContent = 'Atleta não encontrado';
            document.getElementById('detalhesAtleta').appendChild(erro);
          }
        })
        .catch(error => {
          console.error('Erro ao buscar atleta:', error);
          const erro = document.createElement('h1');
          erro.textContent = 'Erro ao buscar atleta';
          document.getElementById('detalhesAtleta').appendChild(erro);
        });
    } else {
      console.error('ID do atleta não especificado na URL');
      const erro = document.createElement('h1');
      erro.textContent = 'ID do atleta não especificado na URL';
      document.getElementById('detalhesAtleta').appendChild(erro);
    }
  });
  