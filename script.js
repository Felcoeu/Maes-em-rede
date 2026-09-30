/* =========================================================
   MÃES EM REDE
   SCRIPT.JS
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

function toggleMenu() {

    const menu = document.getElementById("mobileMenu");

    menu.classList.toggle("active");

}


/* =========================================================
   MODAL DE CADASTRO
========================================================= */

function abrirCadastro() {

    const modal = document.getElementById("cadastroModal");

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function fecharCadastro() {

    const modal = document.getElementById("cadastroModal");

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   CADASTRO
========================================================= */

function cadastrarUsuario(event) {

    event.preventDefault();

    const nome = document.getElementById("nomeCadastro").value;

    fecharCadastro();

    mostrarMensagem(
        "Cadastro realizado! Bem-vinda, " + nome + "!"
    );

    event.target.reset();

}


/* =========================================================
   FILTRO DE CUIDADORAS
========================================================= */

function filtrarCuidadoras() {

    const location =
        document
            .getElementById("locationFilter")
            .value
            .toLowerCase()
            .trim();

    const availability =
        document
            .getElementById("availabilityFilter")
            .value
            .toLowerCase();

    const service =
        document
            .getElementById("serviceFilter")
            .value
            .toLowerCase();


    const cards =
        document.querySelectorAll(".caregiver-card");


    let count = 0;


    cards.forEach(function(card) {

        const cardLocation =
            card.dataset.location.toLowerCase();

        const cardAvailability =
            card.dataset.availability.toLowerCase();

        const cardService =
            card.dataset.service.toLowerCase();


        let matchesLocation = true;
        let matchesAvailability = true;
        let matchesService = true;


        /* FILTRO DE LOCALIZAÇÃO */

        if (location !== "") {

            matchesLocation =
                cardLocation.includes(location);

        }


        /* FILTRO DE DISPONIBILIDADE */

        if (availability !== "todos") {

            matchesAvailability =
                cardAvailability.includes(availability);

        }


        /* FILTRO DE SERVIÇO */

        if (service !== "todos") {

            matchesService =
                cardService.includes(service);

        }


        /* RESULTADO */

        if (
            matchesLocation &&
            matchesAvailability &&
            matchesService
        ) {

            card.style.display = "";

            count++;

        } else {

            card.style.display = "none";

        }

    });


    const resultCount =
        document.getElementById("resultCount");


    if (count === 0) {

        resultCount.textContent =
            "Nenhuma cuidadora encontrada";

        mostrarMensagem(
            "Nenhuma cuidadora encontrada com esses filtros."
        );

    } else if (count === 1) {

        resultCount.textContent =
            "1 profissional encontrada";

    } else {

        resultCount.textContent =
            count + " profissionais encontradas";

    }

}


/* =========================================================
   PERFIS DAS CUIDADORAS
========================================================= */

function abrirPerfil(nome) {

    const modal =
        document.getElementById("perfilModal");

    const nomeModal =
        document.getElementById("modalNome");

    const avatar =
        document.getElementById("modalAvatar");


    nomeModal.textContent = nome;


    const iniciais =
        nome
            .split(" ")
            .map(function(palavra) {
                return palavra.charAt(0);
            })
            .slice(0, 2)
            .join("");


    avatar.textContent = iniciais;


    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function fecharPerfil() {

    const modal =
        document.getElementById("perfilModal");

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   TOAST / NOTIFICAÇÃO
========================================================= */

let toastTimer;


function mostrarMensagem(mensagem) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    toastMessage.textContent = mensagem;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(function() {

        toast.classList.remove("show");

    }, 3500);

}


/* =========================================================
   FECHAR MODAIS CLICANDO FORA
========================================================= */

document.addEventListener("click", function(event) {

    const cadastroModal =
        document.getElementById("cadastroModal");

    const perfilModal =
        document.getElementById("perfilModal");


    if (event.target === cadastroModal) {

        fecharCadastro();

    }


    if (event.target === perfilModal) {

        fecharPerfil();

    }

});


/* =========================================================
   TECLA ESC PARA FECHAR MODAIS
========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        fecharCadastro();
        fecharPerfil();

    }

});


/* =========================================================
   FILTRO AO PRESSIONAR ENTER
========================================================= */

document
    .getElementById("locationFilter")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            filtrarCuidadoras();

        }

    });


/* =========================================================
   ANIMAÇÃO SIMPLES AO ENTRAR NA PÁGINA
========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    const cards =
        document.querySelectorAll(
            ".caregiver-card, .about-card, .training-card"
        );


    cards.forEach(function(card, index) {

        card.style.opacity = "0";
        card.style.transform = "translateY(15px)";


        setTimeout(function() {

            card.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 80);

    });

});