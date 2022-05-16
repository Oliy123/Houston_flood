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
				document.getElementById('getrseci').innerHTML = '</h5><h6>Percent of household without a vehicle(ACS 2013-2017):</h6><h5> ' + Math.round((tracts[0].properties.Pct_HH_Wit),4) + '% ' + ' </h5><h6>Total population:</h6><h5> ' + tracts[0].properties.Population ;
				$('#rsecifeatures').css('height', '75px');
			} else {
				document.getElementById('getrseci').innerHTML = '<br><br><h5>Hover over index for more info</h5>';
				$('#rsecifeatures').css('height', '120px');
			}
		});
	});


var racemap = new mapboxgl.Map({
	container: 'racemap', // HTML container id
	style: 'mapbox://styles/oliyad/cl284fk0200k815ozbqnj20rk', // style URL
	center: [-122.283610, 47.613219], // starting position as [lng, lat]
	zoom: 9.5, // starting zoom
	minzoom: 9.5,
	maxZoom: 13
});
racemap.setMaxBounds([[-122.5615102753933,47.49292476159579],[-121.97748153180596,47.73685399242751]]);
racemap.on('load', function() {
	//create a legend
	var layers = ['<strong>Socioeconomic_Index</strong>', '', 'Least Disadvantaged',  'Less Disadvantaged', 'Median', 'More Disadvantaged', 'Most Disadvantaged'];
	var colors = ['', '', '#a7eeed', '#81e7e5', '#3cd3d0', '#00bab5', '#009b98'];
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
			racelegend.appendChild(item);
	}

	//hover over census tracts to get more info
	racemap.on('mousemove', function(e) {
		var tracts = racemap.queryRenderedFeatures(e.point, {
			layers: ['a-census-tract-profile']
		});
		if (tracts.length > 0) {
			document.getElementById('getrace').innerHTML = '<br><h5><b>' + tracts[0].properties.NAMELSAD10 + '</b><h5><b>% of Population that are POC:</b> ' + tracts[0].properties.PCT_PERSON_OF_COLOR + '</h5>';
			var white = tracts[0].properties.NOT_HISPANIC_LATINO_WHITE_ONE;
			var black = tracts[0].properties.NOTHISPLATINO_BLKAFRCNAMER_ONE;
			var native = tracts[0].properties.NOTHISPLATINO_AMINDALSKNTV_ONE;
			var asian = tracts[0].properties.NOTHISPLATINO_ASIAN_ONE;
			var pacific = tracts[0].properties.NOTHISPLATINO_NHAWAIIOTHPI_ONE;
			var hispanic = tracts[0].properties.HISPANIC_OR_LATINO_OF_ANY_RACE;
			var mixed = tracts[0].properties.NOTHISPLATINO_TWO_OR_MORE_RACE;
			var other = tracts[0].properties.NOTHISPLATINO_SOME_OTHER_ONE;
			new Chart(document.getElementById("racechart"), {
				type: 'doughnut',
				data: {
					labels: ["White", "Black", "Native", "Asian", "Pacific Islander", "Hispanic/Latino", "Mixed Race", "Other"],
					datasets: [
						{
							label: "Population",
							data: [white, black, native, asian, pacific, hispanic, mixed, other]
						}
					]
				},
				options: {
					responsive: true,
					legend: {
						display: true,
						position: 'bottom'
					},
					plugins: {
						colorschemes: {
							scheme: 'tableau.ClassicCyclic13'
						}
					}
				}
		});
			$('#racechart').show();
			$('#racefeatures').css('height', '320px');
		} else {

			document.getElementById('getrace').innerHTML = '<br><br><h5>Hover over index for more info</h5>';
			$('#racechart').hide();
			$('#racefeatures').css('height', '120px');
		}
	});
});

// enumerate ids of the layers
	var toggleableLayerIds = ['medinc', 'povlvl'];
	var layerNames = ['Household Income', 'Poverty Level'];
	var toggleSwitch = false;
		// set up the corresponding toggle button for each layer
		for (var i = 0; i < toggleableLayerIds.length; i++) {
				var id = toggleableLayerIds[i];

				var link = document.createElement('a');
				link.href = '#';
				if (id == 'medinc') {
					link.className = 'active';
				} else {
					link.className = '';
				}
				link.textContent = layerNames[i];
				link.value = id;

				link.onclick = function(e) {
						var clickedLayer = this.value;
						e.preventDefault();
						e.stopPropagation();
						for (var j = 0; j < toggleableLayerIds.length; j++) {
								if (clickedLayer === toggleableLayerIds[j]) {
									layers.children[j].className = 'active';
									incomemap.setLayoutProperty(toggleableLayerIds[j], 'visibility', 'visible');

								}
								else {
									layers.children[j].className = '';
									incomemap.setLayoutProperty(toggleableLayerIds[j], 'visibility', 'none');
								}
						}
				};
				var layers = document.getElementById('toggle');
				layers.appendChild(link);
		}
