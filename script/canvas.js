class Canvas {
	
	// Construct with HTML element
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		
		// Setup internal width
		this.canvas.width = 1000;
		this.canvas.height = 1000;
		
		// Setup styling
		this.context.lineWidth = 5;
		this.context.strokeStyle = '#5cddd0';
		this.context.fillStyle = '#5cddd0';
	}
	
	// Clear canvas
	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	// Begin path
	beginPath() {
		this.context.beginPath();
	}
	
	// End path
	endPath() {
		this.context.stroke();
	}
	
	// Add line point
	lineTo(x, y) {
		this.context.lineTo(x*this.canvas.width, y*this.canvas.height);
	}
}