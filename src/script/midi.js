class MIDI {
	
	// Construct with keyboard
	constructor(keyboard) {
		this.keyboard = keyboard;
	}
	
	// Process MIDI messages
	process(message) {
		const [command, note, velocity] = message.data;
		switch(command.toString(16)[0]) {
			
			// "Note on"
			case '9': {
				if(velocity > 0) {
					this.keyboard.key[note].attack(velocity / 127);
					break;
				}
				
				// Cascade to "Note off" for velocity = 0
 			}
			
			// "Note off"
			case '8': {
				this.keyboard.key[note].release();
				break;
			}
			
			// Clock/Other
			case 'f': {
				break;
			}
		}
	}
}