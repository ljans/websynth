const context = new AudioContext();
const voice = new Voice(context);
const keyboard = new Keyboard(voice);
const midi = new MIDI(keyboard);
const system = new System();
const visualizer = new Visualizer(context);

system.chain({output: voice.collector});
system.chain(visualizer);
system.chain({input: context.destination});

voice.tuning = EqualTemperament;
voice.type = Voice.type.SINE;

visualizer.timeDomain = new Canvas(document.querySelector('#timeDomain'));
visualizer.frequencyDomain = new Canvas(document.querySelector('#frequencyDomain'));