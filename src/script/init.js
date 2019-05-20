document.querySelector('#start').addEventListener('click', function(){
	
	// Remove start screen
	this.parentNode.removeChild(this);
	
	// Setup controller
	const controller = new Controller();
	
	// Setup instrument selector
	const instrumentSelector = document.querySelector('select.instrument');
	instrumentSelector.innerHTML = controller.instruments.map((instrument, index) => `<option value="${index}">${instrument.constructor.name}</option>`).join('');
	instrumentSelector.addEventListener('change', function(){
		controller.voice.instrument = controller.instruments[this.value];
		controller.voice.update();
	});
	
	// Setup tuning selector
	const tuningSelector = document.querySelector('select.tuning');
	tuningSelector.innerHTML = controller.tunings.map((tuning, index) => `<option value="${index}">${tuning.name}</option>`).join('');
	tuningSelector.addEventListener('change', function(){
		controller.voice.tuning = controller.tunings[this.value];
		controller.voice.update();
	});
	
	// Setup reverb selector
	const reverbSelector = document.querySelector('select.reverb');
	reverbSelector.innerHTML = controller.reverbs.map((reverb, index) => `<option value="${index}">${reverb.constructor.name}</option>`).join('');
	reverbSelector.addEventListener('change', function(){ controller.convolver.effect = controller.reverbs[this.value]; });
	
	// Setup reverb toggle
	const toggleReverb = document.querySelector('input.toggleReverb');
	toggleReverb.checked = controller.convolver.enabled;
	toggleReverb.addEventListener('change', function(){ controller.convolver.enabled = this.checked; });
	
	// Setup transposition
	const transpositionInput = document.querySelector('input.transposition');
	transpositionInput.value = controller.voice.transposition;
	transpositionInput.addEventListener('input', function(){
		controller.voice.transposition = parseInt(this.value);
		controller.voice.update();
	});
	
	// Setup volume slider
	const volumeSlider = document.querySelector('input.volume');
	volumeSlider.value = controller.voice.volume;
	volumeSlider.addEventListener('input', function(){ controller.voice.volume = this.value; });
	
	// Setup visualizer
	controller.visualizer.timeDomain = new Canvas(document.querySelector('#timeDomain'));
	controller.visualizer.frequencyDomain = new Canvas(document.querySelector('#frequencyDomain'));
	document.querySelectorAll('canvas').forEach(canvas => {
		canvas.addEventListener('click', () => controller.visualizer.freeze = !controller.visualizer.freeze);
	});
	
	// Setup filter toggle
	const toggleFilter = document.querySelector('input.toggleFilter');
	toggleFilter.checked = controller.filter.enabled;
	toggleFilter.addEventListener('change', function(){ controller.filter.enabled = this.checked; });
	
	// Setup filter selector
	const filterSelector = document.querySelector('select.filter');
	filterSelector.value = controller.filter.type;
	filterSelector.addEventListener('change', function(){ controller.filter.type = this.value; });
	
	// Setup filter frequency
	const frequencyValue = document.querySelector('.frequency span');
	const frequencySlider = document.querySelector('.frequency input');
	frequencyValue.innerHTML = controller.filter.frequency;
	frequencySlider.addEventListener('input', function(){
		const min = 10;
		const max = 24000;
		controller.filter.frequency = Math.round(min*Math.pow(max/min, parseFloat(this.value)));;
		frequencyValue.innerHTML = controller.filter.frequency;
	});
	
	// Setup filter quality
	const qualityValue = document.querySelector('.quality span');
	const qualitySlider = document.querySelector('.quality input');
	qualityValue.innerHTML = controller.filter.quality;
	qualitySlider.value = controller.filter.quality;
	qualitySlider.addEventListener('input', function(){
		controller.filter.quality = parseFloat(this.value);
		qualityValue.innerHTML = Math.round(controller.filter.quality*100)/100;
	});
	
	// Setup filter gain
	const gainValue = document.querySelector('.gain span');
	const gainSlider = document.querySelector('.gain input');
	gainValue.innerHTML = controller.filter.gain;
	gainSlider.value = controller.filter.gain;
	gainSlider.addEventListener('input', function(){
		controller.filter.gain = parseFloat(this.value);
		gainValue.innerHTML = Math.round(controller.filter.gain*100)/100;
	});
	
	// Setup manual
	const manual = document.querySelector('#manual');
	manual.addEventListener('contextmenu', e => e.preventDefault());
	for(let i=36; i<73; i++) {
		
		// Setup key
		const key = document.createElement('div');
		key.classList.add('key');
		if([1,3,6,8,10].includes(i % 12)) key.classList.add('black');
		else key.classList.add('white');
		
		// Register event listeners
		controller.keyboard.key[i].onstatechange = state => key.classList.toggle('active', state);
		key.addEventListener('touchstart', () => controller.keyboard.key[i].attack(0.7));
		key.addEventListener('touchend', () => controller.keyboard.key[i].release());
		manual.appendChild(key);
	}
	
	// Bind MIDI inputs
	navigator.requestMIDIAccess().then(access => {
		access.inputs.forEach(input => {
			
			// Process MIDI messages
			input.onmidimessage = message => {
				controller.midi.process(message);
				
				// Log message
				const data = [];
				data.push('STATUS: '+message.data[0].toString(16)[0]);
				if(message.data[1]) data.push('DATA1: '+message.data[1]);
				if(message.data[2]) data.push('DATA2: '+message.data[2]);
				console.log('%c'+data.join('\t\t'), 'color: blue');
			}
		});
	}, console.error);
});