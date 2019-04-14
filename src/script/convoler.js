class Convoler {
	
	// Construct with context
	constructor(context) {
		this.context = context;
		this.input = this.output = this.convoler = this.context.createConvolver();
	}
	
	// Load effect buffer
	set effect(effect) {
		effect.getBuffer().then(buffer => this.convoler.buffer = buffer);
	}
}