class System {
	
	// Chain a node
	chain(node) {
		if(this.tail) this.tail.connect(node.input);
		if(node.output) this.tail = node.output;
	}
}