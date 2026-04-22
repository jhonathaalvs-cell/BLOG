/*
GG Level News - Separador de Artigos por Categoria (Frontend Puro)
Explicação: Este script filtra e exibe apenas os artigos da categoria selecionada na página de categoria.html, usando JavaScript puro. Ideal para sites estáticos!

Como funciona:
- Lê o parâmetro "cat" da URL (ex: categoria.html?cat=noticias)
- Esconde todos os <article> que não pertencem à categoria escolhida
- Mostra apenas os artigos da categoria correta
- Se não houver parâmetro, mostra todos (ou pode mostrar uma mensagem)

Como usar:
1. Inclua este script APENAS em categoria.html (antes do </body>)
2. Certifique-se que cada <article> tem uma <span class="category-tag category-NOME">NOME</span>
3. Os nomes das categorias no HTML e na URL devem bater (ex: "noticias", "reviews", "lancamentos", "esports", "dicas")
*/

(function() {
  // Função utilitária para pegar o parâmetro da URL
  function getCategoriaFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('cat'); // Exemplo: "noticias"
  }

  // Função principal de filtragem
  function filtrarArtigosPorCategoria() {
    const categoria = getCategoriaFromURL();
    if (!categoria) return; // Se não houver categoria, não faz nada

    // Seleciona todos os cards de artigo
    const artigos = document.querySelectorAll('.news-card');
    artigos.forEach(function(artigo) {
      // Procura o span de categoria dentro do card
      const tag = artigo.querySelector('.category-tag');
      if (tag) {
        // O nome da categoria está no classList (ex: category-noticias)
        if (tag.classList.contains('category-' + categoria)) {
          artigo.style.display = '';
        } else {
          artigo.style.display = 'none';
        }
      }
    });
  }

  // Executa só na página de categoria
  if (window.location.pathname.includes('categoria.html')) {
    document.addEventListener('DOMContentLoaded', filtrarArtigosPorCategoria);
  }
})();
