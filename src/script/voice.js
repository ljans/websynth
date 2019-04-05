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
		this.counter = 0;
		
		this.transposition = 0;
		
		this.tone = [];
		for(let i=0; i<this.oscillators; i++) this.tone[i] = new Tone(this);
		
		this.key = [];
		for(let i=0; i<128; i++) this.key[i] = new Key(this, i);
	}
	
	getTone() {
		return this.tone[this.counter++ % this.oscillators];
	}
}