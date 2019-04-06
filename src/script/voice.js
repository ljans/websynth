class Voice {
	
	// Setup tone types
	static get type() {
		return {
			SINE: 'sine',
			SQUARE: 'square',
			TRIANGLE: 'triangle',
			SAWTOOTH: 'sawtooth',
		}
	}
	
	// Construct with context
	constructor(context) {
		this.context = context;		
		this.transposition = 0;
		
		// Setup tones
		this.tone = [];
		for(let i=0; i<4; i++) this.tone[i] = new Tone(this);
	}
}