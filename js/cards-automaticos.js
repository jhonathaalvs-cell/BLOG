// GG Level News - Cards Automáticos para Últimas Notícias e Reviews
// Este script gera os cards de artigos automaticamente a partir de um array de objetos.
// Mostra até 6 cards na página principal e até 10 na categoria, com botão para ver todos.


// Agora os artigos serão carregados do arquivo artigos.json
let artigos = [];

// Função para gerar os cards
function gerarCardsArtigos(destinoSelector, categoria, maxExibir, verTodosUrl) {
  const destino = document.querySelector(destinoSelector);
  if (!destino) return;
  destino.innerHTML = '';
  // Filtra por categoria se necessário
  let filtrados = categoria ? artigos.filter(a => a.categoria === categoria) : artigos;
  // Ordena por data (mais recente primeiro)
  filtrados = filtrados.sort((a, b) => new Date(b.data) - new Date(a.data));
  // Mostra só os primeiros maxExibir
  filtrados.slice(0, maxExibir).forEach(artigo => {
    destino.innerHTML += `
      <article class="news-card">
        <a href="${artigo.url}" class="card-link">
          <div class="card-image">
            <img src="${artigo.imagem}" alt="${artigo.alt}" width="400" height="225" loading="lazy">
          </div>
          <div class="card-content">
            <div class="article-meta">
              <span class="category-tag category-${artigo.categoria}">${artigo.categoriaLabel}</span>
              <time datetime="${artigo.data}">${artigo.dataFormatada}</time>
            </div>
            <h2 class="card-title">${artigo.titulo}</h2>
            <p class="card-excerpt">${artigo.resumo}</p>
            <div class="card-footer">
              <span class="author">${artigo.autor}</span>
              <span class="read-time">${artigo.tempo}</span>
            </div>
          </div>
        </a>
      </article>
    `;
  });
  // Se houver mais artigos, mostra o botão "Ver todas"
  if (filtrados.length > maxExibir && verTodosUrl) {
    destino.innerHTML += `<div class="see-all-wrapper"><a href="${verTodosUrl}" class="see-all-link">Ver todas as notícias →</a></div>`;
  }
}

// Exemplo de uso para página principal (últimas notícias)

// Função para carregar o JSON e gerar os cards
document.addEventListener('DOMContentLoaded', function() {
  fetch('artigos.json')
    .then(response => response.json())
    .then(data => {
      artigos = data;
      gerarCardsArtigos('#ultimas-noticias', 'noticias', 6, 'categoria.html?cat=noticias');
      gerarCardsArtigos('#ultimos-reviews', 'reviews', 6, 'categoria.html?cat=reviews');
    })
    .catch(err => {
      console.error('Erro ao carregar artigos.json:', err);
    });
});

// Exemplo de uso para página de categoria (mostra até 10)
// gerarCardsArtigos('.news-grid', 'noticias', 10, null); // Chame isso na categoria.html
