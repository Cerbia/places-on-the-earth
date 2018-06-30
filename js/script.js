var elem = document.querySelector('.main-carousel');
var restartButton = document.getElementById('restart-carousel');
var progressBar = document.querySelector('.progress-bar')

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
