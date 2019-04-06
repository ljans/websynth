class Key {
	
	constructor(keyboard, note) {
		this.keyboard = keyboard;
		this.note = note;
	}
	
	attack(velocity) {
		const tone = this.keyboard.bind(this);
		if(tone) tone.start(velocity);
	}
	
	release() {
		const tone = this.keyboard.unbind(this);
		if(tone) tone.stop();
	}
	
}