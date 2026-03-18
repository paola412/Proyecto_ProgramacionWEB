(function () {
    'use strict';

    // --- Carrusel ---
    var slides = document.querySelectorAll('.carrusel .slide');
    var btnAnterior = document.querySelector('.carrusel-btn.anterior');
    var btnSiguiente = document.querySelector('.carrusel-btn.siguiente');
    var contenedorIndicadores = document.querySelector('.carrusel-indicadores');
    var total = slides.length;
    var indiceActual = 0;
    var intervalo;

    function mostrarSlide(n) {
        if (n >= total) indiceActual = 0;
        if (n < 0) indiceActual = total - 1;
        else indiceActual = n;

        slides.forEach(function (slide, i) {
            slide.classList.remove('activo');
            if (i === indiceActual) slide.classList.add('activo');
        });

        var indicadores = contenedorIndicadores.querySelectorAll('span');
        indicadores.forEach(function (ind, i) {
            ind.classList.toggle('activo', i === indiceActual);
        });
    }

    function siguiente() {
        mostrarSlide(indiceActual + 1);
    }

    function anterior() {
        mostrarSlide(indiceActual - 1);
    }

    function iniciarAuto() {
        intervalo = setInterval(siguiente, 5000);
    }

    function pararAuto() {
        clearInterval(intervalo);
    }

    if (slides.length) {
        for (var i = 0; i < total; i++) {
            var punto = document.createElement('span');
            punto.setAttribute('aria-label', 'Ir a slide ' + (i + 1));
            punto.addEventListener('click', function (e) {
                var idx = Array.prototype.indexOf.call(contenedorIndicadores.children, e.target);
                if (idx !== -1) {
                    pararAuto();
                    mostrarSlide(idx);
                    iniciarAuto();
                }
            });
            contenedorIndicadores.appendChild(punto);
        }
        mostrarSlide(0);

        if (btnSiguiente) {
            btnSiguiente.addEventListener('click', function () {
                pararAuto();
                siguiente();
                iniciarAuto();
            });
        }
        if (btnAnterior) {
            btnAnterior.addEventListener('click', function () {
                pararAuto();
                anterior();
                iniciarAuto();
            });
        }

        iniciarAuto();
    }

    // --- Menú móvil ---
    var navToggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            nav.classList.toggle('activo');
        });
    }

    // --- Formulario (evitar envío real por ahora) ---
    var form = document.querySelector('.formulario-contacto');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Gracias por tu mensaje. Esta es una página de ejemplo; en un proyecto real se enviaría al servidor.');
        });
    }
})();
