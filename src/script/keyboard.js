class Keyboard {
	
	constructor(voice) {		
		this.binding = voice.tone.map(tone => ({tone: tone}));
		
		this.key = [];
		for(let i=0; i<128; i++) this.key[i] = new Key(this, i);
	}
	
	bind(key) {
		let free, oldest;
		for(const binding of this.binding) {
			if(!free && !binding.key) free = binding;
			if(!oldest || oldest.time > binding.time) oldest = binding;
		}
		
		const binding = free || oldest;
		binding.time = new Date();
		binding.key = key;
		binding.tone.note = key.note;
		return binding.tone;
	}
	
	unbind(key) {
		for(const binding of this.binding) {
			if(binding.key == key) {
				delete binding.key;
				return binding.tone;
			}
		}
	}
}