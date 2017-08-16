'use strict';

var notes = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b']

function mod(a,b) {
	if (a >= 0) {
		return a % b;
	}
	else {
		return (b - ((-a) % b)) % b;
	}
}

function note_label(i) {
	return '' + notes[mod(i,12)];
}

function handle_node_click(event) {
	console.log('clicked a node ' + event.target.dataset.index);
}

function chord_label(i) {
	if (i % 2 === 0)
	{
		// major
		var j = (i/2) * 7;
		return note_label(j) + note_label(j+4) + note_label(j+7)
	}
	else
	{
		// minor
		var j = 4 + ((i-1)/2) * 7;
		return note_label(j) + note_label(j+3) + note_label(j+7);
	}
}

window.onload = function() {
	var svg = document.getElementById('canvas');
	var wheel = document.createElementNS('http://www.w3.org/2000/svg','circle');
	wheel.setAttribute('cx', 500);
	wheel.setAttribute('cy', 500);
	wheel.setAttribute('r', 400);
	wheel.setAttribute('class', 'wheel');
	svg.append(wheel);

	for (var i = 0; i < 24; i++)
	{
		var node = document.createElementNS('http://www.w3.org/2000/svg','circle');
		var theta = 6.283 * i / 24
		var r = 400;
		node.setAttribute('cx', 500 + r * Math.sin(theta));
		node.setAttribute('cy', 500 - r * Math.cos(theta));
		node.setAttribute('r', 40);
		node.setAttribute('class', (i%2) ? 'minor_chord': 'major_chord');
		node.onclick = handle_node_click;
		node.dataset.index = i;
		svg.append(node);

		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
		text.textContent = chord_label(i);
		text.setAttribute('x', 500 + r * Math.sin(theta));
		text.setAttribute('y', 500 - r * Math.cos(theta) + 5);
		text.setAttribute('width', 100);
		text.setAttribute('height', 100);
		text.setAttribute('class', 'nodetext');
		svg.append(text);
	}
};

