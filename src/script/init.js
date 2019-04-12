const context = new AudioContext();
const voice = new Voice(context);
const keyboard = new Keyboard(voice);
const midi = new MIDI(keyboard);
const system = new System();
const visualizer = new Visualizer(context);

system.chain({output: voice.collector});
system.chain(visualizer);
system.chain({input: context.destination});

const tunings = [
	EqualTemperament,
	MeantoneTemperament,
];

const instruments = [
	new Sine(context),
	new Organ(context),
];

voice.tuning = tunings[0];
voice.instrument = instruments[0];


const instrumentSelector = document.querySelector('select.instruments');
instrumentSelector.innerHTML = instruments.map((instrument, index) => `<option value="${index}">${instrument.constructor.name}</option>`).join('');
instrumentSelector.addEventListener('change', function(){ voice.instrument = instruments[this.value]; });

const tuningSelector = document.querySelector('select.tunings');
tuningSelector.innerHTML = tunings.map((tuning, index) => `<option value="${index}">${tuning.name}</option>`).join('');
tuningSelector.addEventListener('change', function(){ voice.tuning = tunings[this.value]; });


visualizer.timeDomain = new Canvas(document.querySelector('#timeDomain'));
visualizer.frequencyDomain = new Canvas(document.querySelector('#frequencyDomain'));