class Reverb {
	
	constructor(context) {
		this.context = context;
		this.input = this.output = this.convoler = this.context.createConvolver();
	}
	
	async load(impulse) {
		const buffer = await fetch('/impulse/'+impulse+'.wav').then(response => response.arrayBuffer());
		this.convoler.buffer = await this.context.decodeAudioData(buffer);
	}
}