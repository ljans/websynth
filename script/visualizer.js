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
			canvas.lineTo(index/(this.signalBuffer.length-1), (value - (256 - 100)/2)/100);
		});
		canvas.endPath();
	}
	
	// Refresh frequency domain
	refreshFrequencyDomain(canvas) {		
		canvas.clear();
		canvas.beginPath();
		
		// Get and draw data
		this.analyser.getByteFrequencyData(this.frequencyBuffer);		
		this.frequencyBuffer.forEach((value, index) => {
			canvas.lineTo(index/150, 1 - value/256);
		});
		canvas.endPath();
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