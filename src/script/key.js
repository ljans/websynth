class Key {
	
	constructor(voice, note) {
		this.voice = voice;
		this.note = note;
	}
	
	attack(velocity) {
		this.tone = this.voice.getTone();
		this.tone.note = this.note;
		this.tone.start(velocity);
	}
	
	release() {
		this.tone.stop();
	}
	
}