class Voice {
	get oscillators() {
		return this.constructor.oscillators || 2;
	}
	
	static get type() {
		return {
			SINE: 'sine',
			SQUARE: 'square',
			TRIANGLE: 'triangle',
			SAWTOOTH: 'sawtooth',
		}
	}
	
	constructor(context) {
		this.context = context;		
		this.transposition = 0;
		
		this.tone = [];
		for(let i=0; i<this.oscillators; i++) this.tone[i] = new Tone(this);
	}
}