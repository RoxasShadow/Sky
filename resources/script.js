function Sky() {
	var sky = this;
	var offset, counter;
	var defaultmsg;
	
	this.init = function() {
		i = Math.round(Math.floor(Math.random()*$(window).width()));
		sky.offset = new Array(i, i);
		sky.counter = 0;
		sky.defaultmsg = 'There\'s something that bugs me...';
	}
	this.s1 = function() {
		--sky.offset[0];
		$('#cloud').css('background-position', sky.offset[0]+'px 100px');
		setTimeout('sky.s1()', 100);
	}
	this.s2 = function() {
		--sky.offset[1];
		$('#mincloud').css('background-position', sky.offset[1]+'px 240px');
		setTimeout('sky.s2()', 60);
	}
	this.chbg = function(defhour, deffrequpdate) {
		frequpdate = (deffrequpdate === undefined) ? 1800000 : deffrequpdate; // 30 minutes
		hour = (defhour === undefined) ? new Date().getHours() : defhour;
		bg = $('body').css('background-color');
		if(hour >= 4 && hour < 7)
			bg = '#ff8c64';
		else if(hour >= 7 && hour < 16)
			bg = '#96d1ff';
		else if(hour >= 16 && hour < 19)
			bg = '#1eacfd';
		else if(hour >= 19 && hour < 21)
			bg = '#0b3283';
		else if(hour >= 19)
			bg = '#17071c';
		else if(hour < 4)
			bg = '#17071c';
		$('body').css('background-color', bg);
		if(hour >= 5 && hour < 20)
			$('#circle').attr('src', 'resources/sun.png');
		else
			$('#circle').attr('src', 'resources/moon.png');
		setTimeout('sky.chbg('+defhour+', '+frequpdate+')', frequpdate);
	}
	this.rotate = function(deffreq) {
		freq = (deffreq === undefined) ? 60 : deffreq;
		++sky.counter;
		$('#circle').css('-moz-transform', 'rotate('+sky.counter+'deg)');
		$('#circle').css('-webkit-transform', 'rotate('+sky.counter+'deg)');
		$('#circle').css('-o-transform', 'rotate('+sky.counter+'deg)');
		$('#circle').css('-ms-transform', 'rotate('+sky.counter+'deg)');
		$('#circle').css('transform', 'rotate('+sky.counter+'deg)');
		setTimeout('sky.rotate('+freq+')', freq);
	}
	this.getUrlVars = function() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
	this.defaultnotify = function() {
		$('#notify').css('background-color', '#ffd9b2');
		$('#notify').html('<p>'+sky.defaultmsg+'</p>');
	}
	this.notify = function(msg) {
		$('#notify').css('background-color', 'red');
		$('#notify').html('<p>'+msg+'</p>');
		setTimeout('sky.defaultnotify()', 2000);
	}
	this.joke = function() {
		var circle = document.getElementById('circle');
		var basket = document.getElementById('basket');
		addEvent(basket, 'dragover', function() {
			$('#basket').css('background', "url('resources/full-trash.png') no-repeat");
			$('#circle').fadeOut('fast');
			sky.notify('You have the power!');
		});
		$('#basket').click(function() {
			if($('#circle').is(':hidden')) {
				$('#circle').fadeIn('fast');
				$('#basket').css('background', "url('resources/empty-trash.png') no-repeat");
				sky.notify('Summon!');
			}
			else
				sky.notify('Hmm...');
		});
	}
}

$(document).ready(function() {
	sky = new Sky();
	params = sky.getUrlVars();
	hour = (params['hour'] !== undefined) ? params['hour'] : undefined;
	freq = (params['freq'] !== undefined) ? params['freq'] : 60;
	sky.init();
	sky.chbg(hour);
	sky.s1();
	sky.s2();
	sky.rotate(freq);
	sky.joke();
});
