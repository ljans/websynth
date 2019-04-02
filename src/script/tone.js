class Tone {	
	constructor(context) {
		this.context = context;
		
		this.output = context.createGain();
		this.output.gain.value = 0;
		this.output.connect(context.destination);
		
		this.oscillator = context.createOscillator();
		this.oscillator.connect(this.output);
		this.oscillator.start();
	}
	
	set type(type) {
		this.oscillator.type = type;
	}
	
	set frequency(frequency) {
		this.oscillator.frequency.value = frequency;
	}
	
	attack(velocity) {
		this.output.gain.setValueAtTime(velocity / 127, this.context.currentTime);
	}
	
	release() {
		this.output.gain.setValueAtTime(0, this.context.currentTime);
	}
}