class Controller {
	
	constructor() {
		
		// Setup audio context
		this.context = new AudioContext();
		
		// Setup tones
		this.tone = Array(128).fill().map(() => new Tone(this.context));
		
		// Listen to MIDI messages
		navigator.requestMIDIAccess().then(access => {
			access.inputs.forEach(input => {
				input.onmidimessage = message => this.handle(message);
			});
		}, error => {
			console.error(error);
		});
	}
	
	set tuning(tuning) {
		this.tone.forEach((tone, note) => tone.frequency = tuning.getFrequency(note));
	}
	
	set type(type) {
		this.tone.forEach(tone => tone.type = type);
	}
	
	handle(message) {
		const [command, note, velocity] = message.data;
	
		switch(command) {
			
			// Note on (or off if velocity = 0)
			case 144: {
				if(velocity) {
					this.tone[note].attack();
					break;
				} // Cascade to next case
			}
			
			// Note off
			case 128: {
				this.tone[note].release();
			}
		}
	}
}