document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    const translations = {
        es: {
            title: 'ScrollBall',
            description: 'Sencillo editor de barras de desplazamiento CSS.',
            customizeTitle: 'Personaliza tu Scrollbar',
            thumbColorLabel: 'Color del Thumb',
            trackColorLabel: 'Color del Track',
            scrollbarWidthLabel: 'Ancho del Scrollbar',
            scrollbarRadiusLabel: 'Radio de borde',
            scrollbarWidthFirefoxLabel: 'Ancho del Scrollbar (Firefox)',
            previewTitle: 'Vista previa',
            codeOutputTitle: 'Código CSS generado',
            copyButtonText: 'Copiar código',
            themeToggleLabel: 'Cambiar tema',
            githubLinkText: 'GitHub',
            profileLinkText: 'Perfil',
            modal: "Código copiado!!"
        },
        en: {
            title: 'ScrollBall',
            description: 'Simple CSS scrollbar editor.',
            customizeTitle: 'Customize your Scrollbar',
            thumbColorLabel: 'Thumb Color',
            trackColorLabel: 'Track Color',
            scrollbarWidthLabel: 'Scrollbar Width',
            scrollbarRadiusLabel: 'Border Radius',
            scrollbarWidthFirefoxLabel: 'Scrollbar Width (Firefox)',
            previewTitle: 'Preview',
            codeOutputTitle: 'Generated CSS Code',
            copyButtonText: 'Copy code',
            themeToggleLabel: 'Toggle theme',
            githubLinkText: 'GitHub',
            profileLinkText: 'Profile',
            modal: "Copied code!!"
        }
    };

    function updateLanguage(lang) {
        localStorage.setItem("l", lang);
        document.documentElement.lang = lang;
        const t = translations[lang];

        document.querySelector('meta[name="description"]').content = t.description;
        document.querySelector('meta[name="twitter:description"]').content = t.description;
        document.querySelector('meta[property="og:description"]').content = t.description;
        document.querySelector(".modal h4").textContent = t.modal;
        document.querySelector('h1').innerHTML = `<span style="text-decoration: underline;">${t.title[0]}</span>${t.title.slice(1, 6)}<span style="text-decoration: underline;">${t.title[6]}</span>${t.title.slice(7)}`;
        document.querySelector('.customizer h2').textContent = t.customizeTitle;
        document.querySelector('label[for="thumbColor"]').textContent = t.thumbColorLabel;
        document.querySelector('label[for="trackColor"]').textContent = t.trackColorLabel;
        document.querySelector('label[for="scrollbarWidth"]').textContent = t.scrollbarWidthLabel;
        document.querySelector('label[for="scrollbarRadius"]').textContent = t.scrollbarRadiusLabel;
        document.querySelector('label[for="selectM"]').textContent = t.scrollbarWidthFirefoxLabel;
        document.querySelector('.preview h2').textContent = t.previewTitle;
        document.querySelector('.code-output h2').textContent = t.codeOutputTitle;
        document.querySelector('#copyButton span').textContent = t.copyButtonText;
        document.querySelector('#themeToggle').setAttribute('aria-label', t.themeToggleLabel);
        document.querySelector('.social-link:nth-child(1) span').textContent = t.githubLinkText;
        document.querySelector('.social-link:nth-child(2) span').textContent = t.profileLinkText;
    }

    if (localStorage.getItem("l") == "en") {
        updateLanguage("en");
        languageSelect.childNodes[3].selected = true
    }

    languageSelect.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });

});

