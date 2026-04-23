// cookies-consent.js
// Banner de consentimento de cookies com bloqueio do Google Analytics
// Autor: GG Level News

(function() {
  // ID do Google Analytics
  const GA_ID = 'G-HZH9YTXBV2';

  // Função para injetar o script do Google Analytics
  function loadAnalytics() {
    if (window.gtagLoaded) return;
    window.gtagLoaded = true;
    var script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script1);
    var script2 = document.createElement('script');
    script2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`;
    document.head.appendChild(script2);
  }

  // Função para salvar consentimento
  function setConsent(consent) {
    localStorage.setItem('cookies_consent', consent);
  }

  // Função para ler consentimento
  function getConsent() {
    return localStorage.getItem('cookies_consent');
  }

  // Cria o banner de cookies
  function createBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookies-banner';
    banner.style = 'position:fixed;bottom:0;left:0;width:100%;background:#222;color:#fff;padding:16px 8px;z-index:9999;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;font-size:1rem;box-shadow:0 -2px 8px #0006;';
    banner.innerHTML = `
      <span>Este site usa cookies para melhorar sua experiência e analisar acessos. <a href='privacidade.html' style='color:#4fc3f7;text-decoration:underline;'>Saiba mais</a>.</span>
      <button id='cookies-accept' style='background:#4caf50;color:#fff;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;'>Aceitar</button>
      <button id='cookies-reject' style='background:#f44336;color:#fff;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;'>Recusar</button>
    `;
    document.body.appendChild(banner);
    document.getElementById('cookies-accept').onclick = function() {
      setConsent('accepted');
      loadAnalytics();
      banner.remove();
    };
    document.getElementById('cookies-reject').onclick = function() {
      setConsent('rejected');
      banner.remove();
    };
  }

  // Lógica principal
  window.addEventListener('DOMContentLoaded', function() {
    var consent = getConsent();
    if (consent === 'accepted') {
      loadAnalytics();
    } else if (consent === 'rejected') {
      // Não faz nada, cookies não essenciais bloqueados
    } else {
      createBanner();
    }
  });
})();
