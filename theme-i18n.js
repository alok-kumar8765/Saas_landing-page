// theme-i18n.js
(function(){
  const THEMES = ['light','dark','neon'];
  const translations = {
    en: {
      title: "SaaS Analytics",
      hero_sub: "Realtime dashboards, team insights and predictive analytics to grow revenue.",
      hero_cta: "Get Started",
      activation: "Activation",
      users: "Users",
      rating: "Rating",
      features_title: "Powerful features",
      pricing_title: "Choose your plan",
      footer: "© {year} SaaS Lab. All rights reserved.",
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      confirm_password: "Confirm Password",
      forgot: "Forgot Password?"
    },
    hi: {
      title: "सास एनालिटिक्स",
      hero_sub: "रीयलटाइम डैशबोर्ड, टीम इनसाइट्स और प्रेडिक्टिव एनालिटिक्स।",
      hero_cta: "शुरू करें",
      activation: "सक्रियता",
      users: "उपयोगकर्ता",
      rating: "रेटिंग",
      features_title: "शक्तिशाली सुविधाएँ",
      pricing_title: "योजना चुनें",
      footer: "© {year} SaaS लैब। सर्वाधिकार सुरक्षित।",
      login: "लॉगिन",
      register: "रजिस्टर",
      email: "ईमेल",
      password: "पासवर्ड",
      confirm_password: "पासवर्ड सत्यापित करें",
      forgot: "पासवर्ड भूल गए?"
    },
    es: {
      title: "Analítica SaaS",
      hero_sub: "Paneles en tiempo real, información del equipo y análisis predictivos.",
      hero_cta: "Comenzar",
      activation: "Activación",
      users: "Usuarios",
      rating: "Calificación",
      features_title: "Funciones potentes",
      pricing_title: "Elija su plan",
      footer: "© {year} SaaS Lab. Todos los derechos reservados.",
      login: "Iniciar sesión",
      register: "Registrar",
      email: "Correo",
      password: "Contraseña",
      confirm_password: "Confirmar Contraseña",
      forgot: "¿Olvidaste tu contraseña?"
    }
  };

  // apply theme
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);
  }
  // toggle rotates
  function toggleTheme(){
    const cur = localStorage.getItem('site-theme') || 'light';
    const idx = (THEMES.indexOf(cur) + 1) % THEMES.length;
    applyTheme(THEMES[idx]);
  }

  // translations apply
  function applyLang(lang){
    localStorage.setItem('site-lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(key){
        const txt = translations[lang] && translations[lang][key] ? translations[lang][key] : key;
        el.textContent = txt;
      }
    });
    // update footer template
    const footer = document.querySelector('[data-i18n-footer]');
    if(footer){
      const t = translations[lang] && translations[lang].footer ? translations[lang].footer : '{year}';
      footer.textContent = t.replace('{year}', new Date().getFullYear());
    }
  }

  // init on DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{
    // theme init
    const savedTheme = localStorage.getItem('site-theme') || 'light';
    applyTheme(savedTheme);

    // language init defaults to en
    const savedLang = localStorage.getItem('site-lang') || 'en';
    applyLang(savedLang);

    // theme toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => { btn.addEventListener('click', toggleTheme); });

    // language dropdown
    document.querySelectorAll('.lang-wrap').forEach(wrap=>{
      const btn = wrap.querySelector('.lang-btn');
      const menu = wrap.querySelector('.lang-select');
      btn && btn.addEventListener('click', (e)=>{
        e.stopPropagation();
        document.querySelectorAll('.lang-select').forEach(m=>{ if(m!==menu) m.classList.remove('open'); });
        menu.classList.toggle('open');
      });
      wrap.querySelectorAll('.lang-item').forEach(item=>{
        item.addEventListener('click', ()=>{
          const code = item.getAttribute('data-lang');
          const label = item.textContent.trim();
          // update button label
          const span = btn.querySelector('.lang-label');
          if(span) span.textContent = label;
          applyLang(code);
          menu.classList.remove('open');
        });
      });
    });

    // close language menus on outside click
    document.addEventListener('click', ()=> document.querySelectorAll('.lang-select').forEach(m=>m.classList.remove('open')) );
  });

  // expose small api if needed
  window.__SaaSKit = { applyTheme, toggleTheme, applyLang, translations };
})();
