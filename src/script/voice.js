class Voice {
	
	// Construct with context
	constructor(context) {
		this.context = context;		
		this.transposition = 0;
		
		// Setup tone collector
		this.collector = this.context.createGain();
		this.collector.gain.value = 0.5;
		this.output = [this.collector];
		
		// Setup tones
		this.tone = [];
		for(let i=0; i<8; i++) this.tone[i] = new Tone(this);
	}
	
	// Set volume
	set volume(volume) {
		this.collector.gain.setValueAtTime(volume, this.context.currentTime);
	}
	
	// Get volume
	get volume() {
		return this.collector.gain.value;
	}
	
	// Update tones
	update() {
		this.tone.forEach(tone => tone.update());
	}
}