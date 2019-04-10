class Instrument {
	
	// Construct with context
	constructor(context) {
		this.wave = context.createPeriodicWave(Float32Array.from(this.real), Float32Array.from(this.imag));
	}
}