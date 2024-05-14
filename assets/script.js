const slidesData = [
    {
        image: "slide1.jpg",
        tagLine: "Impressions tous formats <span>en boutique et en ligne</span>"
    },
    {
        image: "slide2.jpg",
        tagLine: "Tirages haute définition grand format <span>pour vos bureaux et events</span>"
    },
    {
        image: "slide3.jpg",
        tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>"
    },
    {
        image: "slide4.png",
        tagLine: "Autocollants <span>avec découpe laser sur mesure</span>"
    }
];

// Récupération des éléments DOM récurrents
const slidesContainer = document.querySelector('.slides-container');
const dotsContainer = document.querySelector('.dots');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');// Fonction générique pour créer une diapositive à partir des données
function createSlide(slideData) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    
    const image = document.createElement('img');
    image.classList.add('banner-img');
    image.src = `./assets/images/slideshow/${slideData.image}`;
    
    const paragraph = document.createElement('p');
    paragraph.innerHTML = slideData.tagLine;
    
    slide.appendChild(image);
    slide.appendChild(paragraph);
    
    return slide;
}




// Fonction générique pour créer et afficher les diapositives
function createAndShowSlides(slidesData) {
    slidesData.forEach(slideData => {
        const slide = createSlide(slideData);
        slidesContainer.appendChild(slide);
    });
}

// Fonction générique pour créer et afficher les points de navigation
function createNavigationDots(slidesData) {
    slidesData.forEach((slideData, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);
    });
}

// Fonction pour récupérer l'index de la diapositive actuellement affichée
function getCurrentSlideIndex() {
    const visibleSlide = slidesContainer.querySelector('.slide[style="display: block;"]');
    const slides = Array.from(slidesContainer.querySelectorAll('.slide'));
    return slides.indexOf(visibleSlide);
}


// Fonction pour gérer le clic sur la flèche gauche
function handleLeftArrowClick() {
    showSlide(getCurrentSlideIndex() - 1);
}

// Fonction pour gérer le clic sur la flèche droite
function handleRightArrowClick() {
    showSlide(getCurrentSlideIndex() + 1);
}

function showSlide(index) {
    const slides = Array.from(slidesContainer.querySelectorAll('.slide'));
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

    // Gestion des limites des diapositives
    if (index >= slides.length) {
        index = 0;  // Retour au début
    } else if (index < 0) {
        index = slides.length - 1;  // Aller à la dernière diapositive
    }

    // Cacher toutes les diapositives et désactiver tous les points
    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('dot_selected')); // Modifier ici pour utiliser 'dot_selected'

    // Afficher la diapositive actuelle et activer le point correspondant
    slides[index].style.display = 'block';
    dots[index].classList.add('dot_selected'); // Modifier ici pour utiliser 'dot_selected'
}











// Création et affichage des diapositives
createAndShowSlides(slidesData);

// Création et affichage des points de navigation
createNavigationDots(slidesData);

// Ajout d'event listeners sur les flèches du carousel
arrowLeft.addEventListener('click', handleLeftArrowClick);
arrowRight.addEventListener('click', handleRightArrowClick);

// Affichage de la première diapositive au chargement de la page
showSlide(0);
