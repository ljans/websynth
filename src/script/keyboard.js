class Keyboard {
	
	// Construct with voice
	constructor(voice) {
		
		// Setup bindings based on available tones in voices		
		this.binding = voice.tone.map(tone => ({tone: tone}));
		
		// Setup keys
		this.key = [];
		for(let i=0; i<128; i++) this.key[i] = new Key(this, i);
	}
	
	// Bind a key to a tone
	bind(key) {
		
		// Get a free and the oldest binding
		let free, oldest;
		for(const binding of this.binding) {
			if(!free && !binding.key) free = binding;
			if(!oldest || oldest.time > binding.time) oldest = binding;
		}
		
		// Use the free binding or force-cycle the oldest
		const binding = free || oldest;
		binding.time = new Date();
		binding.key = key;
		binding.tone.note = key.note;
		return binding.tone;
	}
	
	// Unbind a key from a tone
	unbind(key) {
		for(const binding of this.binding) {
			if(binding.key == key) {
				delete binding.key;
				return binding.tone;
			}
		}
	}
}