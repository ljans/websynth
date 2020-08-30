class MeantoneTemperament extends Tuning {
	
	// Setup base frequency
	static get base() {
		return 261.626; // C4
	}
	
	// Setup fifth interval
	static get fifth() {
		return Math.pow(5, 1/4);
	}
	
	// Setup fifth/octave shifting relative to C
	static get shift() {
		return [
			[0,0], // C
			[7,4], // C#
			[2,1], // D
			[-3,-2], // Eb
			[4,2], // E
			[-1,-1], // F
			[6,3], // F#
			[1,0], // G
			[8,4], // G#
			[3,1], // A
			[-2,-2], // Bb
			[5,2], // B
		];
	}
	
	// Calculate frequency for note
	static getFrequency(note) {
		
		// Calculate octave offset
		const octaveOffset = Math.floor(note / 12) - 5;
		
		// Determine fifth/ocatave shifting
		const [shiftFifths, shiftOctaves] = this.shift[note % 12];	
		
		// Calculate frequency based on C
		return this.base * Math.pow(this.fifth, shiftFifths) / Math.pow(2, shiftOctaves - octaveOffset);
	}
}