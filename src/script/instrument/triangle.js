class Triangle extends Instrument {
	get size() { return 8192; }
	
	get real() { return Array(this.size).fill(0); }
	
	get imag() {
		return Array(this.size).fill(0).map((value, index) => {
			return index == 0 ? 0 : (8 * Math.sin((index * Math.PI) / 2)) / Math.pow(Math.PI * index, 2);
		});
	}
}