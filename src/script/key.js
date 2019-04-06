class Key {
	
	constructor(keyboard, note) {
		this.keyboard = keyboard;
		this.note = note;
	}
	
	attack(velocity) {
		if(!this.tone) this.keyboard.bind(this);
		this.tone.start(velocity);
	}
	
	release() {
		if(this.tone) this.tone.stop();
	}
	
}