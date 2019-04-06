class Keyboard {
	
	// Construct with voice
	constructor(voice) {
		this.voice = voice;
		
		// Setup keys
		this.key = [];
		for(let i=0; i<128; i++) this.key[i] = new Key(this, i);
	}
	
	// Bind a note to a tone
	bind(note) {
		
		// Get a free and the longest not used tone
		let free, oldest;
		for(const tone of this.voice.tone) {
			if(!free && !tone.note) free = tone;
			if(!oldest || oldest.used > tone.used) oldest = tone;
		}
		
		// Use the free tone or force-cycle the oldest
		const tone = free || oldest;
		tone.used = this.voice.context.currentTime;
		tone.note = note;
		return tone;
	}
	
	// Unbind a note from a tone
	unbind(note) {
		for(const tone of this.voice.tone) {
			if(tone.note == note) {
				delete tone.note;
				return tone;
			}
		}
	}
}