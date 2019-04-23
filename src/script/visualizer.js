class Visualizer {
	
	// Construct with context
	constructor(context) {
		this.analyser = context.createAnalyser();
		this.input = this.output = [this.analyser];
		
		// Setup FFT size and buffer
		this.analyser.fftSize = 1024;
		this.signalBuffer = new Uint8Array(this.analyser.fftSize);
		this.frequencyBuffer = new Uint8Array(this.analyser.frequencyBinCount); // = fftSize/2
		
		// Start drawing
		this.draw();
	}
	
	// Refresh time domain
	refreshTimeDomain(canvas) {
		canvas.clear();
		canvas.beginPath();
		
		// Get and draw data
		this.analyser.getByteTimeDomainData(this.signalBuffer);
		this.signalBuffer.forEach((value, index) => {
			canvas.lineTo(index/(this.signalBuffer.length-1), value/256);
		});
		canvas.endPath();
	}
	
	// Refresh frequency domain
	refreshFrequencyDomain(canvas) {		
		canvas.clear();
		
		// Get and draw data
		this.analyser.getByteFrequencyData(this.frequencyBuffer);		
		this.frequencyBuffer.forEach((value, index) => {
			const x = Math.log(index+1) / Math.log(this.frequencyBuffer.length);
			const width = Math.sqrt(1 / this.frequencyBuffer.length) / Math.pow(Math.log(index+3), 2);
			canvas.fillRect(x, 1, width, -value/256);
		});
	}
	
	// Draw loop
	draw() {
		if(!this.freeze) {
			if(this.timeDomain) this.refreshTimeDomain(this.timeDomain);
			if(this.frequencyDomain) this.refreshFrequencyDomain(this.frequencyDomain);
		}
		requestAnimationFrame(() => this.draw());
	}
}