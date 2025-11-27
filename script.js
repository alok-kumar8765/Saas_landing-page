<script>
// Simple theme & i18n helper for static pages

const THEMES = ['light','dark','neon'];
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('site-theme', theme);
}
function toggleTheme(){
  const cur = localStorage.getItem('site-theme') || 'light';
  const idx = (THEMES.indexOf(cur)+1)%THEMES.length;
  applyTheme(THEMES[idx]);
}

// translations object (add more keys per template)
const translations = {
  en: { title: "SaaS Analytics", hero_cta: "Get Started", email:"Email", password:"Password", login:"Login", register:"Register", forgot:"Forgot Password?" },
  hi: { title: "सास एनालिटिक्स", hero_cta: "शुरू करें", email:"ईमेल", password:"पासवर्ड", login:"लॉगिन", register:"रजिस्टर", forgot:"पासवर्ड भूल गए?" },
  es: { title: "Analítica SaaS", hero_cta: "Comenzar", email:"Correo", password:"Contraseña", login:"Iniciar sesión", register:"Registrar", forgot:"¿Olvidaste tu contraseña?" }
};

function applyLang(lang){
  localStorage.setItem('site-lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
}

// init
document.addEventListener('DOMContentLoaded', ()=>{
  const storedTheme = localStorage.getItem('site-theme') || 'light';
  applyTheme(storedTheme);
  const storedLang = localStorage.getItem('site-lang') || 'en';
  applyLang(storedLang);

  document.querySelectorAll('.theme-toggle').forEach(btn=>btn.addEventListener('click', toggleTheme));
  document.querySelectorAll('[data-lang]').forEach(btn=>{
    btn.addEventListener('click', e=> applyLang(e.currentTarget.getAttribute('data-lang')));
  });
});
</script>
