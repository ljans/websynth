class Key {
	
	// Construct with keyboard and note
	constructor(keyboard, note) {
		this.keyboard = keyboard;
		this.note = note;
	}
	
	// Attack key with velocity
	attack(velocity) {
		/*
		 * Keyboard.bind will force-cycle a tone for now,
		 * but this could be changed to null if all oscillators are in use.
		 */
		const tone = this.keyboard.bind(this);
		if(tone) tone.start(velocity);
	}
	
	// Release key
	release() {
		// Stop the tone if it was still bound to the key (and not force-cycled)
		const tone = this.keyboard.unbind(this);
		if(tone) tone.stop();
	}
}