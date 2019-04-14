class System {
	
	// Reset output
	constructor() {
		this.output = [];
	}
	
	// Chain a node
	chain(node) {
		for(const output of this.output) {
			for(const input of node.input) {
				output.connect(input);
			}
		}
		
		// Use chained node as new output
		if(node.output) this.output = node.output;
	}
}