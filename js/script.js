
var elem = document.querySelector('.main-carousel');
var restartButton = document.getElementById('restart-carousel');
var progressBar = document.querySelector('.progress-bar');
//Stworzenie zmiennej z kodem szablonu HTML
var templateSlide = document.getElementById('template-carousel-slide').innerHTML;
var slides ="";
var markers =[];

Mustache.parse(templateSlide);
for (var i = 0; i < carouselSlides.length; i++) {
    slides+= Mustache.render(templateSlide, carouselSlides[i]);
    markers[i] = carouselSlides[i].coords;
}
elem.insertAdjacentHTML('afterbegin', slides);

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

var infos = document.getElementById('infos');

window.initMap = function() {
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: markers[0]}
    );

var markers2 = markers.map(function(coord){
    return new google.maps.Marker({position: coord, map: map});
});


//marker3.addListener('click', function(){
//  infos.innerHTML = "marker 3 clicked";
//});

}
