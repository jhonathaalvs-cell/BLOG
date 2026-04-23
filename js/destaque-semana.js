/*
GG Level News - Destaque da Semana (Frontend Puro)
Explicação: Este script permite definir o artigo de destaque da semana usando uma variável JS. Todas as seções (destaque, últimas notícias, mais lidas, etc.) podem puxar automaticamente esse artigo.

Como usar:
1. Defina o link (href) do artigo de destaque na variável abaixo.
2. O script procura todos os lugares onde o destaque deve aparecer e atualiza automaticamente.
3. Para funcionar, os elementos no HTML devem ter um atributo especial:
   - Para o destaque principal: <div id="destaque-semana"></div>
   - Para "Mais lidas": <div id="mais-lidas"></div>
   - Para "Últimas notícias": <div id="ultimas-noticias"></div>
   (Você pode adaptar para sua estrutura, só ajustar os seletores no JS)
*/


// GG Level News - Automação dos Destaques e Mais Lidas
(function() {
  // 1. Defina aqui o link do artigo de destaque da semana
  var destaqueDaSemana = "artigos/esports/aspas-projeta-futuro.html";

  // 2. Defina aqui a lista dos artigos mais lidos da semana (ordem do mais lido para o menos lido)
  // Basta colocar os hrefs dos artigos reais
  var maisLidosSemana = [
    "artigos/lancamentos/windrose.html",
    "artigos/esports/esports-nations-cup-2026.html",
    "artigos/esports/aspas-projeta-futuro.html"
  ];

  // 2. Função para buscar o card do artigo de destaque
  function getCardByHref(href) {
    return document.querySelector('.news-card a.card-link[href="' + href + '"]')?.closest('.news-card');
  }

  // 3. Atualiza o destaque principal usando o layout hero-card
  // Esta função pega os dados do artigo escolhido e monta o destaque com o mesmo visual original
  function atualizarDestaquePrincipal() {
    var card = getCardByHref(destaqueDaSemana);
    var destino = document.getElementById('destaque-semana');
    if (card && destino) {
      // Extrai os dados do card comum
      // Imagem
      var img = card.querySelector('img');
      // Categoria
      var categoria = card.querySelector('.category-tag');
      // Data
      var data = card.querySelector('time');
      // Título
      var titulo = card.querySelector('.card-title')?.textContent || '';
      // Link
      var link = card.querySelector('a.card-link')?.getAttribute('href') || '#';
      // Resumo
      var resumo = card.querySelector('.card-excerpt')?.textContent || '';
      // Autor
      var autor = card.querySelector('.author')?.textContent || '';
      // Tempo de leitura
      var tempo = card.querySelector('.read-time')?.textContent || '';

      // Monta o HTML do destaque (hero-card)
      // Comentários educativos explicando cada parte
      destino.innerHTML = `
        <article class="hero-card">
          <!-- Imagem de destaque -->
          <div class="hero-image">
            <img src="${img?.getAttribute('src') || ''}"
                 alt="${img?.getAttribute('alt') || ''}"
                 width="1200" height="630" loading="eager">
            <span class="badge badge-destaque">🔥 Destaque</span>
          </div>
          <div class="hero-content">
            <div class="article-meta">
              <span class="category-tag ${categoria?.classList.value || ''}">${categoria?.textContent || ''}</span>
              <time datetime="${data?.getAttribute('datetime') || ''}">${data?.textContent || ''}</time>
            </div>
            <h1 class="hero-title">
              <a href="${link}">${titulo}</a>
            </h1>
            <p class="hero-excerpt">${resumo}</p>
            <div class="hero-footer">
              <span class="author">Por <strong>${autor}</strong></span>
              <span class="read-time">${tempo}</span>
            </div>
          </div>
        </article>
        <!--
          ✅ EDUCATIVO: Este bloco é gerado automaticamente pelo JS
          → Os dados vêm do card do artigo escolhido
          → O layout e as classes são iguais ao destaque original (hero-card)
          → Para trocar o destaque, basta mudar a variável destaqueDaSemana
        -->
      `;
    }
  }

  // 4. Atualiza "Mais lidas da semana" automaticamente
  // Gera a lista de mais lidos com visual de ranking
  function atualizarMaisLidas() {
    var destino = document.getElementById('mais-lidas');
    if (!destino) return;
    destino.innerHTML = '';
    maisLidosSemana.forEach(function(href, idx) {
      var card = getCardByHref(href);
      if (card) {
        // Extrai dados principais
        var titulo = card.querySelector('.card-title')?.textContent || 'Artigo';
        var data = card.querySelector('time')?.textContent || '';
        var link = card.querySelector('a.card-link')?.getAttribute('href') || '#';
        // Monta o HTML do item de ranking
        destino.innerHTML += `
          <article class="trending-item">
            <span class="trending-number">${idx + 1}</span>
            <div class="trending-content">
              <h3><a href="${link}">${titulo}</a></h3>
              <div class="article-meta">
                <time>${data}</time>
              </div>
            </div>
          </article>
        `;
      }
    });
    /*
      ✅ EDUCATIVO: Esta lista é gerada automaticamente pelo JS
      → Basta atualizar a lista maisLidosSemana para mudar o ranking
      → O visual segue o padrão do site (trending-item)
    */
  }

  // 5. Atualiza "Últimas notícias" (opcional)
  function atualizarUltimasNoticias() {
    var card = getCardByHref(destaqueDaSemana);
    var destino = document.getElementById('ultimas-noticias');
    if (card && destino) {
      destino.innerHTML = '';
      destino.appendChild(card.cloneNode(true));
    }
  }

  // 6. Executa ao carregar a página
  document.addEventListener('DOMContentLoaded', function() {
    atualizarDestaquePrincipal();
    atualizarMaisLidas();
    atualizarUltimasNoticias();
  });
})();
