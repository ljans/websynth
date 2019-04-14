class Convoler {
	
	// Construct with context
	constructor(context) {
		this.context = context;
		this.convoler = this.context.createConvolver();
		this.input = this.output = [this.convoler];
	}
	
	// Load effect buffer
	set effect(effect) {
		effect.getBuffer().then(buffer => this.convoler.buffer = buffer);
	}
}