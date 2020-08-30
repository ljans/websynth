class Key {
	
	// Construct with keyboard and note
	constructor(keyboard, note) {
		this.keyboard = keyboard;
		this.note = note;
	}
	
	// Attack key with velocity
	attack(velocity) {
		
		// keyboard.bind will return a force-cycled tone for now, but this could be changed to null if all oscillators are in use
		const tone = this.keyboard.bind(this.note);
		if(tone) tone.start(velocity);
		
		// Fire event listener
		if(this.onstatechange) this.onstatechange(true);
	}
	
	// Release key
	release() {
		
		// Stop the tone if it was still bound to the note (and not force-cycled)
		const tone = this.keyboard.unbind(this.note);
		if(tone) tone.stop();
		
		// Fire event listener
		if(this.onstatechange) this.onstatechange(false);
	}
}