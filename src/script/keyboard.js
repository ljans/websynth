class Keyboard {
	
	constructor(voice) {
		this.voice = voice;
		
		this.counter = 0;
		
		this.key = [];
		for(let i=0; i<128; i++) this.key[i] = new Key(this, i);
	}
	
	bind(key) {
		const tone = this.voice.tone[this.counter++ % this.voice.tone.length];
		
		for(const check of this.key) {
			if(check.tone == tone) delete check.tone;
		}
		
		key.tone = tone;
		key.tone.note = key.note;
	}
	
}