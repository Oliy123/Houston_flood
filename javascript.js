//sidebar menu
$("#accordion > li").click(function(){

	if(false == $(this).next().is(':visible')) {
		$('#accordion > ul').slideUp(300);
	}
	$(this).next().slideToggle(300);
});

	mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpeWFkIiwiYSI6ImNrdjdsa24wYzI5dW8ycG1zdGY3Nmdlc2kifQ.8CO7mcebHy1ivmhe25EQDg';
	var rsecimap = new mapboxgl.Map({
		container: 'rsecimap', // HTML container id
		style: 'mapbox://styles/oliyad/cl36cvs73000p14m7jjzlfwqo', // style URL
		center: [-95.330294, 29.736004] , // starting position as [lng, lat]
		zoom: 11, // starting zoom
		minzoom: 11,
		maxZoom: 21,
	});
	// rsecimap.setMaxBounds([[-95.497317, 29.827027, ],[-95.231246, 29.655024]]);
	rsecimap.on('load', function() {
		//create a legend
		var layers = ['<strong>Flood Risk</strong>', '', 'High Risk',  'Moderate', 'Low', 'Very Low'];
		var colors = ['', '', '#fbb23c', '#997336', '#549188', '#75efdd'];

		for (i = 0; i < layers.length; i++) {
				var layer = layers[i];
				var color = colors[i];
				var item = document.createElement('div');
				var key = document.createElement('span');
				key.className = 'legend-key';
				key.style.backgroundColor = color;

				var value = document.createElement('span');
				value.innerHTML = layer;
				item.appendChild(key);
				item.appendChild(value);
				rsecilegend.appendChild(item);
		}

		//hover over census tracts to get more info
		rsecimap.on('mousemove', function(e) {
			var tracts = rsecimap.queryRenderedFeatures(e.point, {
				layers: ['c0-project1-6af1op']
			});

			if (tracts.length > 0) {
				document.getElementById('getrseci').innerHTML = '</h5><h6>Percent of household without a vehicle:</h6><h5> ' + Math.round((tracts[0].properties.Pct_HH_Wit),4) + '% ' + ' </h5><h6>Total population:</h6><h5> ' + tracts[0].properties.Population ;
				$('#rsecifeatures').css('height', '75px');
			} else {
				document.getElementById('getrseci').innerHTML = '<br><br><h5>Hover over index for more info</h5>';
				$('#rsecifeatures').css('height', '120px');
			}
		});
	});
