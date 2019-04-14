class Visualizer {
	
	// Construct with context
	constructor(context) {
		this.analyser = context.createAnalyser();
		this.input = this.output = [this.analyser];
		
		// Setup FFT size and buffer
		this.analyser.fftSize = 1024;
		this.buffer = new Uint8Array(this.analyser.frequencyBinCount);
		
		// Start drawing
		this.draw();
	}
	
	// Refresh time domain
	refreshTimeDomain(canvas) {
		canvas.clear();
		canvas.beginPath();
		
		// Get and draw data
		this.analyser.getByteTimeDomainData(this.buffer);
		this.buffer.forEach((value, index) => {
			canvas.lineTo(index/this.buffer.length, value/256);
		});
		canvas.endPath();
	}
	
	// Refresh frequency domain
	refreshFrequencyDomain(canvas) {		
		canvas.clear();
		
		// Get and draw data
		this.analyser.getByteFrequencyData(this.buffer);		
		this.buffer.forEach((value, index) => {
			const x = Math.log(index+1) / Math.log(this.buffer.length);
			const width = Math.sqrt(1 / this.buffer.length) / Math.pow(Math.log(index+3), 2);
			canvas.fillRect(x, 1, width, -value/256);
		});
	}
	
	// Draw loop
	draw() {
		if(this.timeDomain) this.refreshTimeDomain(this.timeDomain);
		if(this.frequencyDomain) this.refreshFrequencyDomain(this.frequencyDomain);
		requestAnimationFrame(() => this.draw());
	}
}