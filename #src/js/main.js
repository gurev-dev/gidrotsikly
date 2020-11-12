$(function () {

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	testWebP(function (support) {
		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});


	$('.advertising__slider').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev slick-arrow"><img src="images/icon/arrow-left.svg" alt="стрелка в лево"></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow"><img src="images/icon/arrow-right.svg" alt="стрелка в право"></button>'
	});


	$('.tabs__item').on('click', function (e) {
		e.preventDefault();

		$($(this).siblings()).removeClass('tabs__item--active');
		$($(this).parent().siblings().find('div')).removeClass('tabs__content--active');
		$(this).addClass('tabs__item--active');
		$($(this).attr('href')).addClass('tabs__content--active');
	});


	$('.products__item-favorite').on('click', function () {
		$(this).toggleClass('products__item-favorite--active');
	});


	$('.products__slider-items').slick({
		infinite: true,
		slidesToShow: 4,
		variableWidth: true,
		prevArrow: '<button type="button" class="slick-prev slick-arrow"><img src="images/icon/arrow-left-black.svg" alt="стрелка в лево"></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow"><img src="images/icon/arrow-right-black.svg" alt="стрелка в право"></button>'
	});


	$('.catalog__filter-item').on('click', function () {
		$(this).toggleClass('catalog__filter-item--active');
	});

	$('.filter-style').styler();


	$('.item-title__drop').on('click', function () {
		$(this).toggleClass('item-title__drop--active');
		$(this).next().slideToggle('fast');
	});

	$(".js-range-slider").ionRangeSlider({
		type: "double",
		grid: false,
		min: 0,
		max: 1500000,
		from: 100000,
		to: 500000,
	});
});