
document.addEventListener('DOMContentLoaded', function () {
    const thumbColorInput = document.getElementById('thumbColor');
    const trackColorInput = document.getElementById('trackColor');
    const scrollbarWidthInput = document.getElementById('scrollbarWidth');
    const scrollbarRadiusInput = document.getElementById('scrollbarRadius');
    const cssOutput = document.getElementById('cssOutput');
    const copyButton = document.getElementById('copyButton');
    const themeToggle = document.getElementById('themeToggle');
    let radiusValue = document.getElementById('radiusValue');
    let widthValue = document.getElementById('widthValue');
    let trackColorText = document.getElementById('trackColorText');
    let thumbColorText = document.getElementById('thumbColorText');
    const previewContent = document.getElementById('previewContent');
    const previewImage = previewContent.querySelector('img');
    const svgI = themeToggle.querySelectorAll('svg');
    const marker = document.querySelector('.marker-image');
    const selectMoz = document.getElementById('selectM');



    NProgress.configure({
        showSpinner: true,
        trickleSpeed: 200,
        easing: 'ease-in-out',
        speed: 500
    });

    NProgress.start();
    setTimeout(function () {
        NProgress.done();
        document.querySelector('.container').style.display = 'block';
    }, 1000);

    if (localStorage.getItem("tema") == "dark") {
        document.body.classList.add('dark-mode');
        previewImage.src = "./assets/logo_blanco.webp";
        marker.src = "./assets/marcador_blanco.png";
        svgI[0].classList.remove("hide");
    } else {
        document.body.classList.remove('dark-mode');
        svgI[1].classList.remove("hide");
        marker.src = "./assets/marcador_negro.png";
        selectMoz.style.color = "#000";
    }

    function updateScrollbar() {
        const thumbColor = thumbColorInput.value;
        const trackColor = trackColorInput.value;
        trackColorText.value = trackColorInput.value;
        thumbColorText.value = thumbColorInput.value;
        const scrollbarWidth = scrollbarWidthInput.value;
        const scrollbarRadius = scrollbarRadiusInput.value;
        radiusValue.textContent = scrollbarRadiusInput.value + "px";
        widthValue.textContent = scrollbarWidthInput.value + "px";
        const widthMoz = selectMoz.value;

        const css = `:root {
    --track-color: ${trackColor};
    --thumb-color: ${thumbColor};
    --scrollbar-width: ${scrollbarWidth}px;
    --scrollbar-radius: ${scrollbarRadius}px;
    --scrollbar-width-moz: ${widthMoz};
}
        
/* Chrome, Edge, Safari */
body::-webkit-scrollbar {
    width: var(--scrollbar-width);
}
        
body::-webkit-scrollbar-thumb {
    background-color: var(--thumb-color);
    border-radius: var(--scrollbar-radius);
}
        
body::-webkit-scrollbar-track {
    background-color: var(--track-color);
}


/* Firefox */
@supports not selector(::-webkit-scrollbar) {
* {
    scrollbar-width: var(--scrollbar-width-moz);
    scrollbar-color: var(--thumb-color) var(--track-color);
  }
}`;

        if (navigator.userAgent.includes("Firefox")) {
            previewContent.style.setProperty('--scrollbar-width-moz', widthMoz);
            console.log("Usas Firefox");
        } else {
            console.log("No usas Firefox");
        }


        cssOutput.textContent = css;
        Prism.highlightElement(cssOutput);


        previewContent.style.setProperty('--track-color', trackColor);
        previewContent.style.setProperty('--thumb-color', thumbColor);
        previewContent.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
        previewContent.style.setProperty('--scrollbar-radius', scrollbarRadius + 'px');
    }

    thumbColorInput.addEventListener('input', updateScrollbar);
    trackColorInput.addEventListener('input', updateScrollbar);
    scrollbarWidthInput.addEventListener('input', updateScrollbar);
    scrollbarRadiusInput.addEventListener('input', updateScrollbar);
    selectMoz.addEventListener('input', updateScrollbar);

    copyButton.addEventListener('click', function () {
        navigator.clipboard.writeText(cssOutput.textContent);
        const modal = document.querySelector('.modal');
        modal.classList.add("show");
        setTimeout(() => {
            modal.classList.remove("show");
            modal.classList.add("hide");
        }, 2000);

        modal.classList.remove("hide");
    });

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        if (localStorage.getItem("tema") == "dark") {
            svgI[0].classList.add("hide");
            svgI[1].classList.remove("hide");
            localStorage.setItem("tema", "white");
            previewImage.src = "./assets/logo.webp";
            marker.src = "./assets/marcador_negro.png";
            selectMoz.style.color = "#000";
        } else {
            localStorage.setItem("tema", "dark");
            previewImage.src = "./assets/logo_blanco.webp";
            marker.src = "./assets/marcador_blanco.png";
            svgI[1].classList.add("hide");
            svgI[0].classList.remove("hide");
            selectMoz.style.color = "#fff";
        }

    });



    updateScrollbar();
    feather.replace();

});
