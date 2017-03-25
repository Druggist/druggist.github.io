var tiles,
	isMobile = false; //initiate as false

$(function() {
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

    if(!isMobile){
		$.scrollify({
			section : ".section",
			sectionName : "section-name",
			interstitialSection : "",
			easing: "easeOutExpo",
			scrollSpeed: 750,
			offset : 0,
			scrollbars: true,
			standardScrollElements: "",
			setHeights: true,
			overflowScroll: true,
			updateHash: true,
			touchScroll:true,
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
	}
	loadData();
	appendEmail();
});

$(document).ready(function(){
	$(".button-collapse").sideNav();
	$('.scrollspy').scrollSpy({
		scrollOffset: 0
	});
	$('.modal').modal({
		starting_top: '0%',
      	ending_top: '0%',
      	opacity: .9,
      	complete: function() {
      		 if(!isMobile) $.scrollify.enable();
      	}
	});
	mobileNav();
}); 

$(window).scroll(function(){
	mobileNav();
});

$('a[href^="#"]').click(function(e){
	 if(!isMobile){
		e.preventDefault();
		$.scrollify.move($(this).attr('href'));
	}
});

$('a[href$="_section"]').click(function(e){
	$('.button-collapse').sideNav('hide');
	mobileNav();
});

$('#next').click(function(e){
	if(!isMobile){
		e.preventDefault();
		$.scrollify.next();
	}
});

$('#previous').click(function(e){
	if(!isMobile){
		e.preventDefault();
		$.scrollify.previous();
	}
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
	if(!isMobile) $.scrollify.disable();
	var data = $(this).attr("data-id").split("_");
	$(".close-wrapper").attr('class', 'close-wrapper');
	$(".close-wrapper").addClass(data[0]);
	$(".software-list").attr('class', 'software-list');
	$(".software-list").addClass(data[0]);
	$(".creators-list").attr('class', 'creators-list');
	$(".creators-list").addClass(data[0]);
	printModal(data);
});

$('.beer > a').mouseenter(function(){
	$beer = $(this);
	$beer.children('#filling').addClass('active');
	$beer.addClass('active');
	setTimeout(function(){
		$beer.children('#foam').addClass('active');
	}, 450);
});

$('.beer > a').mouseleave(function(){
	$beer.removeClass('active');
	setTimeout(function(){
		$beer.children('#foam').removeClass('active');
		$beer.children('#filling').removeClass('active');
	}, 450);
});

function appendEmail(){
	var user = 'm.najdora',
    	domain = 'gmail.com';
    $('.email > span').append(user + '@' + domain);
}

function mobileNav(){
	if(isMobile){
		$href = ($('a.active[href$="_section"]').attr('href') != null)? $('a.active[href$="_section"]').attr('href') : "";
		$href = $href.replace('#','');
		$href = $href.replace('_section','');
		$(".nav-trigger").attr('class', 'nav-trigger');
		$(".nav-trigger").addClass($href);
	}
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
	var tile = '<div class="col s12 m6 l4 center"><a href="https://github.com/Druggist/minor-uni-projects/tree/master" class="waves-effect btn purple">Minor uni projects</a></div>';
	$("#app_tiles").append(tile);
}

function printModal(data){
	var tile = tiles["responseJSON"][data[0]][data[1]];
	var links = "";
	var text = '<img src="'+tile["img"]+'" class="responsive-img"><h4>'+tile["title"]+'</h4><div class="links row"> ';
		switch(data[0]){
			case "websites":
				if(tile["www"] != "") 

					links += '<div class="col s12 center"><a target="_blank" href="'+tile["www"]+'" class="waves-effect btn green">www</a></div>';
			break;
			case "games":
				var size = "6";
				if(tile["game"] == "" || tile["src"] == "") size = "12"; 
				if(tile["game"] != "") {
					var align = (size == "12")?("center"):("left-align");
					links += '<div class="col s'+size+' '+align+'"><a target="_blank" href="'+tile["game"]+'" class="waves-effect btn red">game</a></div>';
				}
				if(tile["src"] != "") {
					var align = (size == "12")?("center"):("right-align");
					links += '<div class="col s'+size+' '+align+'"><a target="_blank" href="'+tile["src"]+'" class="waves-effect btn red">source</a></div>';
				}
			break;
			case "apps":
				if(tile["src"] != "") 
					links += '<div class="col s12 center"><a target="_blank" href="'+tile["src"]+'" class="waves-effect btn purple">source</a></div>';
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
	$(".modal-content.creators").removeClass("invisible");
	if(tile["creators"].length === 0) $(".modal-content.creators").addClass("invisible");
	$(".creators-list").empty();
	$.each(tile["creators"], function(index, creator){
		$(".creators-list").append('<li><a href="'+creator["href"]+'" target="_blank">'+creator["name"]+'</a></li>');
	});
}