const context = new AudioContext();
const voice = new Voice(context);
const keyboard = new Keyboard(voice);
const midi = new MIDI(keyboard);

voice.tuning = EqualTemperament;
voice.type = Voice.type.SAWTOOTH;