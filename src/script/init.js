const context = new AudioContext();
const voice = new Voice(context);
const midi = new MIDI(voice);

voice.tuning = EqualTemperament;
voice.type = Voice.type.SAWTOOTH;