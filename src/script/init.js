const context = new AudioContext();
const voice = new Voice(context);
const keyboard = new Keyboard(voice);
const midi = new MIDI(keyboard);
const system = new System();

system.chain({output: voice.collector});
system.chain({input: context.destination});

voice.tuning = EqualTemperament;
voice.type = Voice.type.SAWTOOTH;