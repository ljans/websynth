class Tone {
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
		this.oscillator = this.context.createOscillator();
		this.oscillator.start();
	}
	
	set type(type) {
		this.oscillator.type = type;
	}
	
	set frequency(frequency) {
		this.oscillator.frequency.value = frequency;
	}
	
	attack(velocity) {
		this.oscillator.connect(this.context.destination);
	}
	
	release() {
		this.oscillator.disconnect(this.context.destination);
	}
}