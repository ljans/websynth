class Voice {
	
	static get type() {
		return {
			SINE: 'sine',
			SQUARE: 'square',
			TRIANGLE: 'triangle',
			SAWTOOTH: 'sawtooth',
		}
	}
	
	constructor(context) {
		this.tone = Array(128).fill().map(() => new Tone(context));
	}
	
	set tuning(tuning) {
		this.tone.forEach((tone, note) => tone.frequency = tuning.getFrequency(note));
	}
	
	set type(type) {
		this.tone.forEach(tone => tone.type = type);
	}	
}