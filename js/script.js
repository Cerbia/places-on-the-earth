
var elem = document.querySelector('.main-carousel');
var restartButton = document.getElementById('restart-carousel');
var progressBar = document.querySelector('.progress-bar');
//Stworzenie zmiennej z kodem szablonu HTML
var templateSlide = document.getElementById('template-carousel-slide').innerHTML;
var slides ="";

//dodanie szablonu
Mustache.parse(templateSlide);
for (var i = 0; i < carouselSlides.length; i++) {
    slides+= Mustache.render(templateSlide, carouselSlides[i]);
}
elem.insertAdjacentHTML('afterbegin', slides);

//karuzela
var flkty = new Flickity( elem, {
    bgLazyLoad: 1, 
    freeScroll: true, 
    wrapAround: true, 
    hash: true
});
restartButton.addEventListener('click', function() {
    flkty.select( 0, false, false );
});

flkty.on( 'scroll', function( progress ) {
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
});
    

