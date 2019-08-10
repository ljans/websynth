class Controller {
	constructor() {
		
		// Construct objects
		this.context = new AudioContext();
		this.voice = new Voice(this.context);
		this.keyboard = new Keyboard(this.voice);
		this.midi = new MIDI(this.keyboard);
		this.system = new System();
		this.visualizer = new Visualizer(this.context);
		this.convolver = new Convolver(this.context);
		this.speaker = new Speaker(this.context);
		this.filter = new Filter(this.context);
		this.microphone = new Microphone(this.context);
		
		// Setup system
		this.system.chain(this.voice);
		this.system.chain(this.microphone);
		this.system.chain(this.convolver);
		this.system.chain(this.filter);
		this.system.chain(this.visualizer);
		this.system.chain(this.speaker);
		
		// Setup tunings
		this.tunings = [
			EqualTemperament,
			MeantoneTemperament,
		];
		
		// Setup instruments
		this.instruments = [
			new Organ(this.context),
			new Oboe(this.context),
			new Bass(this.context),
			new Sine(this.context),
			new Sawtooth(this.context),
			new Square(this.context),
			new Triangle(this.context),
		];
		
		// Setup reverbs
		this.reverbs = [
			new Church(this.context),
			new IronTub(this.context),
			new Telephone(this.context),
		];
		
		// Apply initial settings
		this.voice.tuning = this.tunings[0];
		this.voice.instrument = this.instruments[0];
		this.convolver.effect = this.reverbs[0];
		this.convolver.enabled = true;
		this.filter.enabled = false;
	}
}