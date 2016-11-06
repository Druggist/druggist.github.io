$(function() {
	$.scrollify({
		section : ".section",
		sectionName : "section-name",
		interstitialSection : "",
		easing: "easeOutExpo",
		scrollSpeed: 900,
		offset : 0,
		scrollbars: true,
		standardScrollElements: "",
		setHeights: false,
		overflowScroll: true,
		before:function() {
			$currSection = $.scrollify.current();
			$href = $currSection[0].id.replace('_section','');
			menuClasses($href);
		},
		after:function() { 
		},
		afterResize:function() {},
		afterRender:function() {
			$.scrollify.update();
			$currSection = $.scrollify.current();
			$href = $currSection[0].id.replace('_section','');
			menuClasses($href);
		}
	});
	appendEmail();
});

$(document).ready(function(){
	$(".button-collapse").sideNav();
}); 

$('a[href="#main"]').click(function(e){
	e.preventDefault();
	$.scrollify.move("#main");
});

$('a[href="#about_me"]').click(function(e){
	e.preventDefault();
	$.scrollify.move("#about_me");
});

$('a[href="#websites"]').click(function(e){
	e.preventDefault();
	$.scrollify.move("#websites");
});

$('a[href="#games"]').click(function(e){
	e.preventDefault();
	$.scrollify.move("#games");
});

$('a[href="#apps"]').click(function(e){
	e.preventDefault();
	$.scrollify.move("#apps");
});

$('a[href="#support_me"]').click(function(e){
	e.preventDefault();
	$.scrollify.move("#support_me");
});

$('a[href="#contact"]').click(function(e){
	e.preventDefault();
	$.scrollify.move("#contact");
});

$('#next').click(function(e){
	e.preventDefault();
	$.scrollify.next();
});

$('#previous').click(function(e){
	e.preventDefault();
	$.scrollify.previous();
});

function appendEmail(){
	var user = 'm.najdora',
    	domain = 'gmail.com';
    $('.email').append(user + '@' + domain);
}

function menuClasses($href){
	if($href == 'contact') $("#next").addClass('disabled');
	else $("#next").removeClass('disabled');

	if($href == 'main') $(".vertical-bullet-menu").addClass('close');
	else {
		if($('.vertical-bullet-menu').hasClass("close")) 
			setTimeout(function(){
				$(".vertical-bullet-menu").removeClass('close')
				setTimeout(function(){
					$('a[href="#'+$href+'"]').removeClass('expanded');
				}, 1500);
			}, 900);
		else {	
			setTimeout(function(){
				$('a[href="#'+$href+'"]').removeClass('expanded');
			}, 1500);
		}
	}

	$(".active").removeClass("active")
	$(".expanded").removeClass("expanded")
	$('a[href="#'+$href+'"]').addClass("active expanded");
	$(".nav-trigger").attr('class', 'nav-trigger');
	$(".nav-trigger").addClass($href);
}