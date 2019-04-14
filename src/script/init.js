const context = new AudioContext();
const voice = new Voice(context);
const keyboard = new Keyboard(voice);
const midi = new MIDI(keyboard);
const system = new System();
const visualizer = new Visualizer(context);
const convoler = new Convoler(context);
const speaker = new Speaker(context);

system.chain(voice);
system.chain(visualizer);
system.chain(convoler);
system.chain(speaker);

const tunings = [
	EqualTemperament,
	MeantoneTemperament,
];

const instruments = [
	new Sine(context),
	new Sawtooth(context),
	new Square(context),
	new Triangle(context),
	new Organ(context),
	new Oboe(context),
	new Bass(context),
];

const reverbs = [
	new Church(context),
	new Factory(context),
];

voice.tuning = tunings[0];
voice.instrument = instruments[0];
convoler.effect = reverbs[0];
convoler.enabled = true;

const instrumentSelector = document.querySelector('select.instrument');
instrumentSelector.innerHTML = instruments.map((instrument, index) => `<option value="${index}">${instrument.constructor.name}</option>`).join('');
instrumentSelector.addEventListener('change', function(){ voice.instrument = instruments[this.value]; });

const tuningSelector = document.querySelector('select.tuning');
tuningSelector.innerHTML = tunings.map((tuning, index) => `<option value="${index}">${tuning.name}</option>`).join('');
tuningSelector.addEventListener('change', function(){ voice.tuning = tunings[this.value]; });

const reverbSelector = document.querySelector('select.reverb');
reverbSelector.innerHTML = reverbs.map((reverb, index) => `<option value="${index}">${reverb.constructor.name}</option>`).join('');
reverbSelector.addEventListener('change', function(){ convoler.effect = reverbs[this.value]; });

const toggleReverb = document.querySelector('input.toggleReverb');
toggleReverb.checked = convoler.enabled;
toggleReverb.addEventListener('change', function(){ convoler.enabled = this.checked; });

visualizer.timeDomain = new Canvas(document.querySelector('#timeDomain'));
visualizer.frequencyDomain = new Canvas(document.querySelector('#frequencyDomain'));