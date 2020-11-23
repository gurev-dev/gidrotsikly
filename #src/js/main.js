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


	$('.favorite-icon').on('click', function () {
		$(this).toggleClass('favorite-icon--active');
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



	$('.filter-style__select-text').on('click', function () {
		$(this).toggleClass('select-text__checked');
	});


	$('.catalog__filter-btn--grid').on('click', function () {
		$(this).addClass('catalog__filter-btn--active');
		$('.catalog__filter-btn--line').removeClass('catalog__filter-btn--active');
		$('.catalog__product-item').removeClass('product-item__list')
	});
	$('.catalog__filter-btn--line').on('click', function () {
		$(this).addClass('catalog__filter-btn--active');
		$('.catalog__filter-btn--grid').removeClass('catalog__filter-btn--active');
		$('.catalog__product-item').addClass('product-item__list')
	});



	$('.menu__burger').on('click', function () {
		$('.menu__categories').addClass('open');
	});
	$('.menu__mobile-close').on('click', function () {
		$('.menu__categories').removeClass('open');
	});

	$(document).on('click', function (e) {
		var $target = $(e.target);
		if ($target.closest(".menu__categories").length == 0 && $target.closest(".menu__burger").length == 0) {
			$(".menu__categories").removeClass("open");
		}
	});

	$('.menu__categories').on('click', function () {
		$('.menu__categories').removeClass('open');
	});



	$(".js-range-slider").ionRangeSlider({
		type: "double",
		grid: false,
		min: 0,
		max: 1500000,
		from: 100000,
		to: 500000,
	});

	$("#rateYo").rateYo({
		rating: 4,
		readOnly: true,
		ratedFill: "#1c62cd",
		normalFill: "#c4c4c4"
	});


});