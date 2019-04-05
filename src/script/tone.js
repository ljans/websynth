class Tone {	
	constructor(voice) {
		this.voice = voice;
		
		this.output = this.voice.context.createGain();
		this.output.gain.value = 0;
		this.output.connect(this.voice.context.destination);
		
		this.oscillator = this.voice.context.createOscillator();
		this.oscillator.connect(this.output);
		this.oscillator.start();
	}
	
	start(volume) {
		this.update();
		this.output.gain.setValueAtTime(volume, this.voice.context.currentTime);
	}
	
	stop() {
		this.output.gain.setValueAtTime(0, this.voice.context.currentTime);
	}
	
	update() {
		this.oscillator.type = this.voice.type;
		this.oscillator.frequency.value = this.voice.tuning.getFrequency(this.note + this.voice.transposition);
	}
}