class Tone {
	
	// Construct with voice
	constructor(voice) {
		this.voice = voice;
		
		// Setup output gain regulator
		this.output = this.voice.context.createGain();
		this.output.gain.value = 0;
		this.output.connect(this.voice.collector);
		
		// Setup oscillator
		this.oscillator = this.voice.context.createOscillator();
		this.oscillator.connect(this.output);
		this.oscillator.start();
	}
	
	// Start the tone with a volume
	start(volume) {
		this.update();
		this.output.gain.setValueAtTime(volume, this.voice.context.currentTime);
	}
	
	// Stop the tone
	stop() {
		this.output.gain.setValueAtTime(0, this.voice.context.currentTime);
	}
	
	// Update the oscillator properties
	update() {
		this.oscillator.type = this.voice.type;
		this.oscillator.frequency.value = this.voice.tuning.getFrequency(this.note + this.voice.transposition);
	}
}