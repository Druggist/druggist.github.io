var tiles;
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
	loadData();
	appendEmail();
});

$(document).ready(function(){
	$(".button-collapse").sideNav();
	$('.modal').modal({
		starting_top: '0',
      	ending_top: '0',
      	opacity: .9,
      	complete: function() {
      		$.scrollify.enable();
      	}
	});
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

$('.close').click(function(e){
	e.preventDefault();
	$('#info_modal').modal('close');
})

$('.modal').click(function() {
	$('#info_modal').modal('close');
});

$('.modal-content').click(function(event){
    event.stopPropagation();
});

$('body').on('click', '.modal-trigger', function() {
	$.scrollify.disable();
	var data = $(this).attr("data-id").split("_");
	$(".close-wrapper").attr('class', 'close-wrapper');
	$(".close-wrapper").addClass(data[0]);
	$(".software-list").attr('class', 'software-list');
	$(".software-list").addClass(data[0]);
	printModal(data);
});

function appendEmail(){
	var user = 'm.najdora',
    	domain = 'gmail.com';
    $('.email > span').append(user + '@' + domain);
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

function loadData(){
	tiles = $.getJSON("static/data/tiles.json")
		.done(function(json) {
    		printWebsites(json["websites"]);
    		printGames(json["games"]);
    		printApps(json["apps"]);
  		})
	  	.fail(function( jqxhr, textStatus, error ) {
		    var err = textStatus + ", " + error;
		    console.log( "Request Failed: " + err );
		});
}

function printWebsites(tiles){
	$.each(tiles, function(index, website){
		var tile = '<div class="col s12 m6 l4"><a href="#info_modal" data-id="websites_'+index+'" class="modal-trigger waves-effect waves-light tile"><svg viewbox="0 0 100 100" preserveAspectRatio="none" class="bottom"><polygon points="100 100, 80 100, 100 60"></polygon></svg><div class="center img-wrapper"><img src="'+website["img"]+'" class="responsive-img"></div><span>'+website["title"]+'</span></a></div>';
		$("#website_tiles").append(tile);
	});
}

function printGames(tiles){
	$.each(tiles, function(index, game){
		var tile = '<div class="col s12 m6 l4"><a href="#info_modal" data-id="games_'+index+'" class="modal-trigger waves-effect waves-light tile"><svg viewbox="0 0 100 100" preserveAspectRatio="none" class="bottom"><polygon points="100 100, 80 100, 100 60"></polygon></svg><div class="center img-wrapper"><img src="'+game["img"]+'" class="responsive-img"></div><span>'+game["shortTitle"]+'</span></a></div>';
		$("#game_tiles").append(tile);
	});
}

function printApps(tiles){
	$.each(tiles, function(index, app){
		var tile = '<div class="col s12 m6 l4"><a href="#info_modal" data-id="apps_'+index+'" class="modal-trigger waves-effect waves-light tile"><svg viewbox="0 0 100 100" preserveAspectRatio="none" class="bottom"><polygon points="100 100, 80 100, 100 60"></polygon></svg><div class="center img-wrapper"><img src="'+app["img"]+'" class="responsive-img"></div><span>'+app["title"]+'</span></a></div>';
		$("#app_tiles").append(tile);
	});
}

function printModal(data){
	var tile = tiles["responseJSON"][data[0]][data[1]];
	var links = "";
	var text = '<img src="'+tile["img"]+'" class="responsive-img"><h4>'+tile["title"]+'</h4><div class="links row"> ';
		switch(data[0]){
			case "websites":
				if(tile["www"] != "") 
					links += '<div class="col s12 center"><a href="'+tile["www"]+'" class="waves-effect btn green">www</a></div>';
			break;
			case "games":
				var size = "6";
				if(tile["game"] == "" || tile["src"] == "") size = "12"; 
				if(tile["game"] != "") 
					links += '<div class="col s'+size+' left-align"><a href="'+tile["game"]+'" class="waves-effect btn red">game</a></div>';
				if(tile["src"] != "") 
					links += '<div class="col s'+size+' right-align"><a href="'+tile["src"]+'" class="waves-effect btn red">source</a></div>';
			break;
			case "apps":
				if(tile["src"] != "") 
					links += '<div class="col s12 center"><a href="'+tile["src"]+'" class="waves-effect btn purple">source</a></div>';
			break;
		}
		text += '</div>';
	$(".modal-content.main").empty();
	$(".modal-content.main").append(text);
	$(".modal-content.links > .row").empty();
	$(".modal-content.links > .row").append(links);
	$(".modal-content.description > p").empty();
	$(".modal-content.description > p").append(tile["desc"]);
	$(".software-list").empty();
	$.each(tile["software"], function(index, software){
		$(".software-list").append('<li>'+software["name"]+'</li>');
	});
}