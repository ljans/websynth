class Keyboard {
	
	constructor(voice) {		
		this.counter = 0;
		
		this.binding = voice.tone.map(tone => ({tone: tone}));
		
		this.key = [];
		for(let i=0; i<128; i++) this.key[i] = new Key(this, i);
	}
	
	bind(key) {
		let next;
		for(const binding of this.binding) {
			if(!binding.key) {
				next = binding;
				break;
			}
		}
		
		const binding = next || this.binding[this.counter++ % this.binding.length];
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