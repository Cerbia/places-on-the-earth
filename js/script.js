
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


var infos = document.getElementById('infos');
// Initialize and add the map
window.initMap = function() {
 	// The location of Uluru
  	var uluru = {lat: -25.344, lng: 131.036};
  	var coords2 = {lat: -25.363, lng: 134.044};
	var coords3 = {lat: -25.363, lng: 137.044};
  	// The map, centered at Uluru
  	var map = new google.maps.Map(
      	document.getElementById('map'), {zoom: 4, center: uluru});
  	// The marker, positioned at Uluru
  	var marker = new google.maps.Marker({position: uluru, map: map});
  	var marker2 = new google.maps.Marker({position: coords2, map: map});
  	var marker3 = new google.maps.Marker({position: coords3, map: map});

  	marker3.addListener('click', function(){
  		infos.innerHTML = "marker 3 clicked";
  	});

}
