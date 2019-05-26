module.exports = function (args) {
	console.log('main', args.t);

	const header = $('header').height();
	const heightWindow = window.innerHeight;
	const heightCarousel = heightWindow-header;

	$(".fade-carousel").css("height", heightCarousel);
}