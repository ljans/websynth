class Filter {
	
	// Construct with context
	constructor(context) {
		this.context = context;
		
		// Create gateway and bypass gains
		this.gateway = this.context.createGain();
		this.bypass = this.context.createGain();
		
		// Create convolver
		this.filter = this.context.createBiquadFilter();
		this.filter.connect(this.gateway);
		
		// Setup I/O
		this.input = [this.filter, this.bypass];
		this.output = [this.gateway, this.bypass];
	}
	
	// Enable/disable filter
	set enabled(state) {
		this.state = state;
		this.gateway.gain.value = state ? 1 : 0;
		this.bypass.gain.value = state ? 0 : 1;
	}
	
	// Get filter state
	get enabled() {
		return this.state;
	}
	
	// Type
	get type() { return this.filter.type; }
	set type(type) { this.filter.type = type; }
	
	// Frequency
	get frequency() { return this.filter.frequency.value; }
	set frequency(frequency) { this.filter.frequency.value = frequency; }
	
	// Quality
	get quality() { return this.filter.Q.value; }
	set quality(quality) { this.filter.Q.value = quality; }
	
	// Gain
	get gain() { return this.filter.gain.value; }
	set gain(gain) { this.filter.gain.value = gain; }
}