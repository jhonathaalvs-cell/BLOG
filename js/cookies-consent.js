// GG Level News - Cookie Consent (LGPD/Analytics)
// Banner simples de consentimento de cookies
// Exibe o banner, salva escolha no localStorage e só ativa Analytics se aceitar

document.addEventListener('DOMContentLoaded', function() {
  var banner = document.getElementById('cookieBanner');
  var btnAccept = document.getElementById('cookieAccept');
  var btnReject = document.getElementById('cookieReject');

  // Se já escolheu, esconde o banner
  if (localStorage.getItem('cookieConsent')) {
    banner.style.display = 'none';
    if (localStorage.getItem('cookieConsent') === 'accepted') {
      ativarAnalytics();
    }
    return;
  }

  // Aceitar cookies
  btnAccept.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.style.display = 'none';
    ativarAnalytics();
  });

  // Rejeitar cookies
  btnReject.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'rejected');
    banner.style.display = 'none';
  });

  // Função para ativar o Google Analytics
  function ativarAnalytics() {
    // Substitua pelo seu código do Google Analytics 4 se necessário
    if (!window.gtag) {
      var script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // Troque pelo seu ID
      script.async = true;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX'); // Troque pelo seu ID
    }
  }
});
