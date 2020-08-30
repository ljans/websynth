class Square extends Instrument {
	get size() { return 8192; }
	
	get real() { return Array(this.size).fill(0); }
	
	get imag() {
		return Array(this.size).fill(0).map((value, index) => {
			return index == 0 ? 0 : (2 / (index * Math.PI)) * (1 - Math.pow(-1, index));
		});
	}
}