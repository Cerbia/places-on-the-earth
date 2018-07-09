
var elem = document.querySelector('.main-carousel');
var restartButton = document.getElementById('restart-carousel');
var progressBar = document.querySelector('.progress-bar');
//Stworzenie zmiennej z kodem szablonu HTML
var templateSlide = document.getElementById('template-carousel-slide').innerHTML;
var slides ="";
var coordinates =[];

Mustache.parse(templateSlide);
for (var i = 0; i < carouselSlides.length; i++) {
    slides+= Mustache.render(templateSlide, carouselSlides[i]);
    coordinates[i] = carouselSlides[i].coords;
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
        document.getElementById('map'), {zoom: 4, center: coordinates[0]}
    );

    var markers = coordinates.map(function(coord){
        return new google.maps.Marker({position: coord, map: map});
    });

    markers.forEach(function(marker,index){
        marker.addListener('click', function() {
            flkty.select(index);
        });
    });

    flkty.on( 'change', function( index ) {
        smoothPanAndZoom(map, 4, coordinates[index]);
        //map.setZoom(4);
        //map.setCenter(coordinates[index]);
    });

    var smoothPanAndZoom = function(map, zoom, coords){
        // Trochę obliczeń, aby wyliczyć odpowiedni zoom do którego ma oddalić się mapa na początku animacji.
        var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
        jumpZoom = Math.min(jumpZoom, zoom -1);
        jumpZoom = Math.max(jumpZoom, 3);

        // Zaczynamy od oddalenia mapy do wyliczonego powiększenia. 
        smoothZoom(map, jumpZoom, function(){
            // Następnie przesuwamy mapę do żądanych współrzędnych.
            smoothPan(map, coords, function(){
                // Na końcu powiększamy mapę do żądanego powiększenia. 
                smoothZoom(map, zoom); 
            });
        });
    };
    
    var smoothZoom = function(map, zoom, callback) {
        var startingZoom = map.getZoom();
        var steps = Math.abs(startingZoom - zoom);
        
        // Jeśli steps == 0, czyli startingZoom == zoom
        if(!steps) {
            // Jeśli podano trzeci argument
            if(callback) {
                // Wywołaj funkcję podaną jako trzeci argument.
                callback();
            }
            // Zakończ działanie funkcji
            return;
        }

        // Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
        var stepChange = - (startingZoom - zoom) / steps;

        var i = 0;
        // Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
        var timer = window.setInterval(function(){
            // Jeśli wykonano odpowiednią liczbę kroków
            if(++i >= steps) {
                // Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
                window.clearInterval(timer);
                // Jeśli podano trzeci argument
                if(callback) {
                    // Wykonaj funkcję podaną jako trzeci argument
                    callback();
                }
            }
            // Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
            map.setZoom(Math.round(startingZoom + stepChange * i));
        }, 80);
    };

    // Poniższa funkcja działa bardzo podobnie do smoothZoom. Spróbuj samodzielnie ją przeanalizować. 
    var smoothPan = function(map, coords, callback) {
        var mapCenter = map.getCenter();
        coords = new google.maps.LatLng(coords);

        var steps = 12;
        var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

        var i = 0;
        var timer = window.setInterval(function(){
            if(++i >= steps) {
                window.clearInterval(timer);
                if(callback) callback();
            }
            map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
        }, 1000/30);
    };

}
