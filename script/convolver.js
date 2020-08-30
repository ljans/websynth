class Convolver {
	
	// Construct with context
	constructor(context) {
		this.context = context;
		
		// Create gateway and bypass gains
		this.gateway = this.context.createGain();
		this.bypass = this.context.createGain();
		
		// Create convolver
		this.convolver = this.context.createConvolver();
		this.convolver.connect(this.gateway);
		
		// Setup I/O
		this.input = [this.convolver, this.bypass];
		this.output = [this.gateway, this.bypass];
	}
	
	// Load effect buffer
	set effect(effect) {
		effect.getBuffer().then(buffer => this.convolver.buffer = buffer);
	}
	
	// Enable/Disable convolver
	set enabled(state) {
		this.state = state;
		this.gateway.gain.value = state ? 1 : 0;
		this.bypass.gain.value = state ? 0 : 1;
	}
	
	// Get convolver state
	get enabled() {
		return this.state;
	}
}