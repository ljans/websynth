class MIDI {
	
	constructor(voice) {
		this.voice = voice;
		
		// Listen to MIDI messages
		navigator.requestMIDIAccess().then(access => {
			access.inputs.forEach(input => {
				input.onmidimessage = message => this.handle(message);
			});
		}, error => {
			console.error(error);
		});
	}
	
	handle(message) {
		const [command, note, velocity] = message.data;
	
		switch(command) {
			
			// Note on (or off if velocity = 0)
			case 144: {
				if(velocity) {
					this.voice.tone[note].attack(velocity);
					break;
				} // Cascade to next case
			}
			
			// Note off
			case 128: {
				this.voice.tone[note].release();
			}
		}
	}
}