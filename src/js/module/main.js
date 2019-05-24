export default function () {
	const header = $('header').height();
	const heightWindow = window.innerHeight;
	const heightCarousel = heightWindow-header;

	$(".fade-carousel").css("height", heightCarousel);
}