function Sky() {
	var sky = this;
	var offset, counter;
	
	this.init = function() {
		i = Math.round(Math.floor(Math.random()*$(window).width()));
		sky.offset = new Array(i, i);
		sky.counter = 0;
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
	this.chbg = function(defhour) {
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
	}
	this.rotate = function(deffreq) {
		freq = (deffreq === undefined) ? 60 : deffreq;
		++sky.counter;
		$('#sun').css('-moz-transform', 'rotate('+sky.counter+'deg)');
		$('#sun').css('-webkit-transform', 'rotate('+sky.counter+'deg)');
		$('#sun').css('-o-transform', 'rotate('+sky.counter+'deg)');
		$('#sun').css('-ms-transform', 'rotate('+sky.counter+'deg)');
		$('#sun').css('transform', 'rotate('+sky.counter+'deg)');
		setTimeout('sky.rotate('+freq+')', freq);
	}
	this.getUrlVars = function() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
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
});
