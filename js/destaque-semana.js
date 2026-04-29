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
  var destaqueDaSemana = "artigos/noticias/wolverine.html";

  // 2. Defina aqui a lista dos artigos mais lidos da semana (ordem do mais lido para o menos lido)
  // Basta colocar os hrefs dos artigos reais
  var maisLidosSemana = [
    {
      href: "artigos/noticias/onimusha.html",
      titulo: "Capcom ainda tem surpresas em 2026 e novo Onimusha vem aí",
      img: "images/noticias/onimusha/capa1.png",
      alt: "Onimusha Way of the Sword - Capcom 2026",
      data: "2026-04-24",
      categoria: "Notícias",
      resumo: "A Capcom surpreende em 2026 com o retorno da franquia Onimusha. Veja tudo sobre a trama, combate e novidades do novo jogo.",
      autor: "GG Level News",
      tempo: "4 min"
    },
    {
      href: "artigos/noticias/pragmata.html",
      titulo: "PRAGMATA é GOTY? Veja o novo jogo da Capcom",
      img: "images/noticias/pragmata/capa1.webp",
      alt: "Pragmata - Gameplay e análise do novo jogo da Capcom",
      data: "2026-04-20",
      categoria: "Notícias",
      resumo: "O novo título da Capcom mistura ação, hacking e ficção científica em uma aventura na Lua. Confira o que achamos.",
      autor: "GG Level News",
      tempo: "4 min"
    },
    {
      href: "artigos/lancamentos/windrose.html",
      titulo: "Windrose chega em acesso antecipado e chama atenção em 2026",
      img: "images/lancamentos/Windrose img/Art_02_name.jpg",
      alt: "Windrose - Survival de piratas em mundo aberto, lançamento 2026",
      data: "2026-04-14",
      categoria: "Lançamentos",
      resumo: "Novo survival de piratas mistura exploração, crafting e batalhas navais. Veja detalhes do lançamento e gameplay.",
      autor: "GG Level News",
      tempo: "4 min"
    },
    {
      href: "artigos/esports/esports-nations-cup-2026.html",
      titulo: "Esports Nations Cup 2026: Brasil na disputa",
      img: "images/esports/sports nations cup img/cup.webp",
      alt: "esports nations cup",
      data: "2026-04-21",
      categoria: "Esports",
      resumo: "É a nova Copa do Mundo dos esports, reunindo seleções nacionais em Riade. Entenda como funciona e o papel do Brasil!",
      autor: "GG Level News",
      tempo: "4 min"
    }
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
    maisLidosSemana.forEach(function(artigo, idx) {
      destino.innerHTML += `
        <article class="trending-item">
          <span class="trending-number">${idx + 1}</span>
          <div class="trending-content">
            <a href="${artigo.href}">
              <img src="${artigo.img}" alt="${artigo.alt}" width="60" height="34" loading="lazy" style="vertical-align:middle;margin-right:8px;border-radius:4px;">
              <strong>${artigo.titulo}</strong>
            </a>
            <div class="article-meta">
              <time>${artigo.data}</time>
              <span class="category-tag">${artigo.categoria}</span>
            </div>
          </div>
        </article>
      `;
    });
    /*
      ✅ EDUCATIVO: Agora a lista é gerada a partir do array de objetos, não depende mais dos cards do HTML
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
