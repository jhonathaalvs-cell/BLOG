/*
╔══════════════════════════════════════════════════════════════════╗
║  🎮 GG Level News - JavaScript Principal                       ║
║  📚 MODO AULA: Cada função está comentada para aprendizado      ║
║                                                                  ║
║  FUNCIONALIDADES:                                               ║
║  1. Menu mobile (hamburger)                                     ║
║  2. Busca expandível                                            ║
║  3. Tema escuro/claro com persistência                          ║
║  4. Cookie consent (LGPD)                                       ║
║  5. Botão voltar ao topo                                        ║
║  6. Animações ao scrollar (Intersection Observer)               ║
║  7. Lazy loading de imagens (fallback)                          ║
║  8. Compartilhamento social                                     ║
╚══════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// SEÇÃO 1: DOM CONTENT LOADED
// → Espera o HTML carregar completamente antes de executar JS
// → NUNCA manipule o DOM antes disso (elementos não existem)
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
    /*
      ✅ AULA: DOMContentLoaded vs load
      → DOMContentLoaded: Dispara quando o HTML foi parseado
        (mais rápido, não espera imagens/CSS)
      → load: Dispara quando TUDO carregou (imagens, CSS, etc.)
      → Use DOMContentLoaded para scripts de UI
      → Use load para scripts que dependem de imagens
    */

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 2: MENU MOBILE (Hamburger)
    // ═══════════════════════════════════════════════════════

    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            /*
              ✅ AULA: classList.toggle()
              → Adiciona a classe se não tem, remove se tem
              → Perfeito para abrir/fechar menus
              → Alternativas: classList.add(), classList.remove()
            */
            this.classList.toggle('active');
            mainNav.classList.toggle('active');

            // Acessibilidade: informa ao leitor de tela se o menu está aberto
            const isOpen = mainNav.classList.contains('active');
            this.setAttribute('aria-expanded', isOpen);
            this.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        });

        // Fecha o menu ao clicar em um link (mobile)
        mainNav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 3: BARRA DE BUSCA EXPANDÍVEL
    // ═══════════════════════════════════════════════════════

    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');

    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function () {
            searchBar.classList.toggle('active');

            // Foca no campo de busca quando abrir
            if (searchBar.classList.contains('active') && searchInput) {
                searchInput.focus();
                /*
                  ✅ AULA: .focus()
                  → Move o cursor para o campo automaticamente
                  → Melhora a UX: o usuário pode digitar imediatamente
                  → Boa experiência = menor taxa de rejeição = melhor SEO
                */
            }
        });

        // Fecha a busca ao pressionar ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchBar.classList.contains('active')) {
                searchBar.classList.remove('active');
                searchToggle.focus();
            }
        });
    }

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 4: TEMA ESCURO / CLARO
    // → Salva a preferência no localStorage
    // → Respeita a preferência do sistema operacional
    // ═══════════════════════════════════════════════════════

    const themeToggle = document.getElementById('themeToggle');

    function initTheme() {
        /*
          ✅ AULA: localStorage
          → Armazena dados no navegador do usuário
          → Persiste mesmo fechando o navegador
          → Máximo ~5MB por domínio
          → Use para preferências (tema, idioma, etc.)
          → NUNCA armazene dados sensíveis (senhas, tokens)
        */
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        /*
          ✅ AULA: prefers-color-scheme
          → Detecta se o usuário usa tema escuro no SO/navegador
          → Se sim, ativa dark mode automaticamente
          → Respeitar preferências do usuário = boa UX
        */

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
        }
    }

    initTheme();

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 5: COOKIE CONSENT (LGPD)
    // → Lei Geral de Proteção de Dados (obrigatório no Brasil)
    // → Google AdSense/Analytics exige consentimento
    // ═══════════════════════════════════════════════════════

    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');

    function initCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');

        if (!consent && cookieBanner) {
            // Mostra o banner após 1 segundo (não bloqueia o conteúdo)
            setTimeout(function () {
                cookieBanner.classList.add('active');
            }, 1000);
        }
    }

    initCookieConsent();

    if (cookieAccept) {
        cookieAccept.addEventListener('click', function () {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('active');

            /*
              ✅ AULA: Quando o usuário ACEITA cookies
              → Aqui você ativa Google Analytics, AdSense, etc.
              → Só carregue scripts de rastreamento APÓS o consentimento
              → Isso é obrigatório pela LGPD
              
              Exemplo:
              loadGoogleAnalytics();
              loadFacebookPixel();
            */
        });
    }

    if (cookieReject) {
        cookieReject.addEventListener('click', function () {
            localStorage.setItem('cookieConsent', 'rejected');
            cookieBanner.classList.remove('active');
            // Não carrega scripts de rastreamento
        });
    }

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 6: BOTÃO VOLTAR AO TOPO    // → Aparece quando o usuário rola mais de 500px
    // → window.scrollTo() leva suavemente ao topo
    // → O CSS cuida da animação (opacity + visibility)    // ═══════════════════════════════════════════════════════

    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            /*
              ✅ AULA: window.scrollY
              → Retorna quantos pixels o usuário scrollou
              → Quando scrollar mais de 500px, mostra o botão
              → O CSS cuida da animação (opacity/visibility)
            */
        }, { passive: true });
        /*
          ✅ AULA: { passive: true }
          → Informa ao navegador que NÃO vamos chamar preventDefault()
          → Permite scroll mais suave (performance)
          → O Chrome avisa no console se não usar em eventos de scroll
        */

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 7: HEADER STICKY COM SOMBRA AO SCROLLAR    // → Quando o usuário rola a página, o header ganha sombra
    // → Isso cria um efeito de "elevação" elegante
    // → Sem scroll = sem sombra (limpo)
    // → Com scroll = sombra aparece (indica que tem conteúdo acima)    // ═══════════════════════════════════════════════════════

    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 8: ANIMAÇÕES AO SCROLLAR (Intersection Observer)
    // → Anima elementos quando entram na viewport
    // → Mais performático que scroll event listeners
    // ═══════════════════════════════════════════════════════

    function initScrollAnimations() {
        /*
          ✅ AULA: Intersection Observer API
          → Observa quando um elemento entra/sai da tela
          → MUITO mais performático que ouvir o evento 'scroll'
          → Usado para: lazy loading, animações, infinite scroll
          → threshold: 0.1 = dispara quando 10% do elemento é visível
        */
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                    // unobserve: para de observar após animar (performance)
                }
            });
        }, observerOptions);

        // Observa todos os cards e seções
        var elements = document.querySelectorAll('.news-card, .review-card, .trending-item, .sidebar-widget');
        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    initScrollAnimations();

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 9: COMPARTILHAMENTO SOCIAL
    // → Botões de compartilhar sem depender de SDKs externos
    // → Mais rápido e mais privado para o usuário
    // ═══════════════════════════════════════════════════════

    /*
      ✅ AULA: Compartilhamento via URL
      → Cada rede social tem uma URL de compartilhamento
      → Basta abrir a URL com os parâmetros corretos
      → Não precisa carregar SDK pesado do Facebook/Twitter
      → Resultado: site mais rápido = melhor SEO
    */
    document.querySelectorAll('.share-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var pageUrl = encodeURIComponent(window.location.href);
            var pageTitle = encodeURIComponent(document.title);
            var shareUrl = '';

            if (this.classList.contains('twitter')) {
                shareUrl = 'https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle;
            } else if (this.classList.contains('facebook')) {
                shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;
            } else if (this.classList.contains('whatsapp')) {
                shareUrl = 'https://api.whatsapp.com/send?text=' + pageTitle + '%20' + pageUrl;
            } else if (this.classList.contains('telegram')) {
                shareUrl = 'https://t.me/share/url?url=' + pageUrl + '&text=' + pageTitle;
            } else if (this.classList.contains('copy-link')) {
                navigator.clipboard.writeText(window.location.href).then(function () {
                    btn.textContent = '✓ Copiado!';
                    setTimeout(function () {
                        btn.textContent = '🔗 Copiar Link';
                    }, 2000);
                });
                return;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 10: LAZY LOADING FALLBACK
    // → Para navegadores que não suportam loading="lazy"
    // ═══════════════════════════════════════════════════════

    if (!('loading' in HTMLImageElement.prototype)) {
        /*
          ✅ AULA: Feature Detection
          → Verifica se o navegador suporta loading="lazy"
          → Se não suporta, usa Intersection Observer como fallback
          → "Progressive Enhancement": funciona em todos os navegadores
        */
        var lazyImages = document.querySelectorAll('img[loading="lazy"]');
        var imageObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function (img) {
            imageObserver.observe(img);
        });
    }

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 11: LINK ATIVO NA NAVEGAÇÃO
    // → Detecta automaticamente qual página está aberta
    // → Adiciona a classe .active no link correspondente
    // → O CSS destaca o link ativo com cor diferente
    // → Ajuda o usuário a saber onde está no site
    // ═══════════════════════════════════════════════════════

    function setActiveNavLink() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(function (link) {
            var href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            } else if (currentPage === 'index.html' && href === 'index.html') {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 12: LEITURA ESTIMADA (para artigos)
    // → Calcula tempo de leitura baseado em palavras por minuto
    // ═══════════════════════════════════════════════════════

    function calculateReadTime() {
        var articleBody = document.querySelector('.article-body');
        if (!articleBody) return;

        var text = articleBody.textContent || '';
        var words = text.trim().split(/\s+/).length;
        var readTime = Math.ceil(words / 200); // 200 palavras por minuto

        var readTimeElement = document.querySelector('.article-read-time');
        if (readTimeElement) {
            readTimeElement.textContent = readTime + ' min de leitura';
        }
        /*
          ✅ AULA: Tempo de leitura
          → Média de leitura: ~200-250 palavras por minuto
          → Mostrar tempo de leitura aumenta engajamento
          → Usuários sabem quanto tempo precisam investir
          → Schema.org tem propriedade "timeRequired" para isso
        */
    }

    calculateReadTime();

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 13: FORMULÁRIO DE NEWSLETTER
    // → Captura o submit do formulário
    // → e.preventDefault() impede o reload da página
    // → Valida o email com regex (expressão regular)
    // → Em produção, envie para um serviço real
    //   (Mailchimp, ConvertKit, backend próprio)
    // ═══════════════════════════════════════════════════════

    var newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var emailInput = form.querySelector('input[type="email"]');
            if (!emailInput) return;

            var email = emailInput.value.trim();

            // Validação básica de email
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }

            /*
              ✅ AULA: Em produção, envie para seu backend
              → Não processe formulários apenas no front-end
              → Use um serviço como Mailchimp, ConvertKit, etc.
              → Ou crie uma API no seu backend
              
              Exemplo com fetch:
              fetch('/api/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: email })
              });
            */

            // Feedback visual
            var submitBtn = form.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Inscrito!';
            submitBtn.disabled = true;
            emailInput.value = '';

            setTimeout(function () {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    });

    // ═══════════════════════════════════════════════════════
    // SEÇÃO 14: TABLE OF CONTENTS (para artigos longos)
    // → Gera sumário automaticamente a partir dos headings
    // → Melhora navegação em artigos longos
    // → Google pode mostrar links de seção nos resultados
    // ═══════════════════════════════════════════════════════

    function generateTableOfContents() {
        var tocContainer = document.getElementById('tableOfContents');
        var articleBody = document.querySelector('.article-body');

        if (!tocContainer || !articleBody) return;

        var headings = articleBody.querySelectorAll('h2, h3');
        if (headings.length < 3) return; // Só mostra TOC se tiver 3+ seções

        var tocHTML = '<h3 class="widget-title">📑 Neste Artigo</h3><ul class="toc-list">';

        headings.forEach(function (heading, index) {
            // Cria ID para cada heading (para links âncora)
            var id = 'section-' + index;
            heading.id = id;

            var level = heading.tagName === 'H3' ? 'toc-sub' : '';
            tocHTML += '<li class="' + level + '"><a href="#' + id + '">' + heading.textContent + '</a></li>';
        });

        tocHTML += '</ul>';
        tocContainer.innerHTML = tocHTML;

        /*
          ✅ AULA: Table of Contents (Sumário)
          → Links âncora (#section) ajudam na navegação
          → Google pode mostrar links de seção nos resultados
          → Melhora a experiência do usuário em artigos longos
          → Reduz taxa de rejeição (bounce rate)
        */
    }

    generateTableOfContents();

    // ═══════════════════════════════════════════════════════════════
    // NAVEGAÇÃO ATIVA - Marca o link correto no menu
    // ═══════════════════════════════════════════════════════════════
    /*
      ✅ AULA: Navegação ativa dinâmica
      → Problema: todas as categorias usam a mesma categoria.html
      → Sem JS, o "active" ficaria sempre no mesmo link
      → Solução: ler a URL atual e marcar o link certo
      → window.location.pathname = caminho da página (ex: /categoria.html)
      → window.location.search = parâmetros (ex: ?cat=noticias)
      → URLSearchParams = API moderna para ler parâmetros da URL
    */
    var allNavLinks = document.querySelectorAll('.nav-link');
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var urlParams = new URLSearchParams(window.location.search);
    var currentCat = urlParams.get('cat');

    allNavLinks.forEach(function (link) {
        // Remove active de todos primeiro
        link.classList.remove('active');

        var linkHref = link.getAttribute('href');
        var linkPath = linkHref.split('/').pop().split('?')[0];
        var linkParams = new URLSearchParams(linkHref.includes('?') ? linkHref.split('?')[1] : '');
        var linkCat = linkParams.get('cat');

        // Marca active se: mesma página E mesma categoria (ou sem categoria)
        if (linkPath === currentPath) {
            if (currentCat && linkCat === currentCat) {
                link.classList.add('active');
            } else if (!currentCat && !linkCat) {
                link.classList.add('active');
            }
        }
    });

}); // Fim do DOMContentLoaded


// ═══════════════════════════════════════════════════════════════
// SEÇÃO 15: PERFORMANCE - Registro do Service Worker (PWA)
// → Permite que o site funcione offline
// → Melhora velocidade com cache inteligente
// → Google Lighthouse pontua melhor sites com SW
// ═══════════════════════════════════════════════════════════════

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Descomente quando tiver um service worker implementado:
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(reg) { console.log('SW registrado:', reg.scope); })
        //     .catch(function(err) { console.log('SW falhou:', err); });
    });
    /*
      ✅ AULA: Service Worker
      → Script que roda em background no navegador
      → Permite cache de recursos (HTML, CSS, JS, imagens)
      → Site carrega mesmo sem internet
      → Essencial para PWA (Progressive Web App)
      → Melhora performance = melhor SEO
    */
}


// ═══════════════════════════════════════════════════════════════
// SEÇÃO 16: GOOGLE ANALYTICS (Template)
// → Só carregue APÓS consentimento de cookies (LGPD)
// → Substitua 'G-XXXXXXXXXX' pelo seu ID real
// ═══════════════════════════════════════════════════════════════

function loadGoogleAnalytics() {
    /*
      ✅ AULA: Google Analytics 4 (GA4)
      → Ferramenta GRATUITA do Google para medir tráfego
      → Mostra: visitantes, páginas vistas, tempo no site, etc.
      → ESSENCIAL para entender seu público
      → Cadastre-se em: https://analytics.google.com/
      → Substitua 'G-XXXXXXXXXX' pelo seu Measurement ID
    */

    // Só carrega se o usuário consentiu
    if (localStorage.getItem('cookieConsent') !== 'accepted') return;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
}


// ═══════════════════════════════════════════════════════════════
// SEÇÃO 17: STRUCTURED DATA HELPER
// → Adiciona Schema.org dinamicamente para artigos
// ═══════════════════════════════════════════════════════════════

function addArticleSchema(articleData) {
    /*
      ✅ AULA: Schema.org dinâmico
      → Em um blog real com CMS, o Schema é gerado no backend
      → Essa função é um exemplo de como adicionar via JS
      → O Google prefere que Schema esteja no HTML estático
      → Use isso apenas como aprendizado/fallback
    */

    var schema = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": articleData.title,
        "description": articleData.description,
        "image": articleData.image,
        "datePublished": articleData.datePublished,
        "dateModified": articleData.dateModified || articleData.datePublished,
        "author": {
            "@type": "Person",
            "name": articleData.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "GG Level News",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.gglevelnews.com.br/images/site/logo.jpg"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
        }
    };

    var scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(schema);
    document.head.appendChild(scriptTag);
}