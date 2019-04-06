class Voice {
	
	// Get the number of tones
	get tones() {
		return this.constructor.tones || 2;
	}
	
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
		for(let i=0; i<this.tones; i++) this.tone[i] = new Tone(this);
	}
}