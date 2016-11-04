$(function() {
	$.scrollify({
		section : ".section",
		sectionName : "section-name",
		interstitialSection : "",
		easing: "easeOutExpo",
		scrollSpeed: 1200,
		offset : 0,
		scrollbars: true,
		standardScrollElements: "",
		setHeights: false,
		overflowScroll: true,
	//	before:function() {},
	//	after:function() {},
	//	afterResize:function() {},
	//	afterRender:function() {}
	});
});

$(document).ready(function(){
	$(".button-collapse").sideNav();
}); 


$('a[href="#about_me"]').click(function(e){
	e.preventDefault();
	$.scrollify.move("#about_me");
});