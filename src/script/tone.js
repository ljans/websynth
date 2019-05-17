class Tone {
	
	// Construct with voice
	constructor(voice) {
		this.voice = voice;
		this.note = 0;
		
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
		
		// Fade in, somehow needs a volume > 0 at start + set volume at end in case the fading fails
		this.output.gain.setValueAtTime(0.0001, this.voice.context.currentTime);
		this.output.gain.exponentialRampToValueAtTime(volume, this.voice.context.currentTime + 0.01);
		this.output.gain.setValueAtTime(volume, this.voice.context.currentTime + 0.01);
	}
	
	// Stop the tone
	stop() {
		
		// Fade out
		this.output.gain.exponentialRampToValueAtTime(0.0001, this.voice.context.currentTime + 0.01);
		this.output.gain.setValueAtTime(0, this.voice.context.currentTime + 0.01);
	}
	
	// Update the oscillator properties
	update() {
		this.oscillator.setPeriodicWave(this.voice.instrument.wave);
		this.oscillator.frequency.value = this.voice.tuning.getFrequency(this.note + this.voice.transposition);
	}
}