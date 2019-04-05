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
			
			// "Note on"
			case 144: {
				this.voice.key[note].attack(velocity / 127);
				break;
			}
			
			// "Note off"
			case 128: {
				this.voice.key[note].release();
				break;
			}
			
			// Clock
			case 254: {
				break;
			}
		}
	}
}