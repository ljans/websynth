class MIDI {
	
	// Construct with keyboard
	constructor(keyboard) {
		this.keyboard = keyboard;
	}
	
	// Process MIDI messages
	process(message) {
		const [command, note, velocity] = message.data;
		switch(command) {
			
			// "Note on"
			case 144: {
				this.keyboard.key[note].attack(velocity / 127);
				break;
			}
			
			// "Note off"
			case 128: {
				this.keyboard.key[note].release();
				break;
			}
			
			// Clock
			case 254: {
				break;
			}
		}
	}
}