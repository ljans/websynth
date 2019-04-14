class Convoler {
	
	// Construct with context
	constructor(context) {
		this.context = context;
		
		// Create gateway and bypass gains
		this.gateway = this.context.createGain();
		this.bypass = this.context.createGain();
		
		// Create convoler
		this.convoler = this.context.createConvolver();
		this.convoler.connect(this.gateway);
		
		// Setup I/O
		this.input = [this.convoler, this.bypass];
		this.output = [this.gateway, this.bypass];
	}
	
	// Load effect buffer
	set effect(effect) {
		effect.getBuffer().then(buffer => this.convoler.buffer = buffer);
	}
	
	// Enable/Disable convoler
	set enabled(state) {
		this.state = state;
		this.gateway.gain.value = state ? 1 : 0;
		this.bypass.gain.value = state ? 0 : 1;
	}
	
	// Get convoler state
	get enabled() {
		return this.state;
	}
}