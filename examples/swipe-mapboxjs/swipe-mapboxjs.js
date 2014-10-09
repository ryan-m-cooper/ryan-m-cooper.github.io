L.mapbox.accessToken = 'pk.eyJ1IjoicmNvb3BlciIsImEiOiJGRFNpMkQwIn0.uQkzg6GPp3wJvEUOEWkI6Q';
var map = L.mapbox.map('map');
L.mapbox.tileLayer('rcooper.4n6irudi').addTo(map);

var overlay = L.mapbox.tileLayer('rcooper.8g33ow29').addTo(map);
var range = document.getElementById('range');

function clip() {
  var nw = map.containerPointToLayerPoint([0, 0]),
      se = map.containerPointToLayerPoint(map.getSize()),
      clipX = nw.x + (se.x - nw.x) * range.value;

  overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
}

range['oninput' in range ? 'oninput' : 'onchange'] = clip;
map.on('move', clip);
map.setView([38.2100,-84.5598], 15);

clip();