class Reverb extends Effect {
	get impulse() {}
	
	// Load buffer from impulse response file
	async getBuffer() {
		return await fetch(this.impulse).then(response => response.arrayBuffer()).then(data => this.context.decodeAudioData(data));
	}
}