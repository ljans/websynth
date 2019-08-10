class Microphone {
	
	constructor(context) {
		this.context = context;
		
		// Setup merger
		this.merger = this.context.createGain();
		this.input = this.output = [this.merger];
		
		// Add microphone input
		navigator.webkitGetUserMedia({audio: true}, stream => {
			var mic = controller.context.createMediaStreamSource(stream);
			mic.connect(this.merger);
		}, console.error);
	}	
}