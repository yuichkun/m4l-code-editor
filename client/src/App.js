import MidiNote from './api';
import exec from './execContext';
import mockMaxIntf from './helpers/mockMaxIntf';

class App {
  constructor() {
    this.pluginStr = null;
    if (window.max) {
      this.midiHandler = window.max;
      this.bindMaxInlet();
    } else {
      this.midiHandler = mockMaxIntf;
      window.isBrowser = true;
    }
  }

  bindMaxInlet() {
    window.max.bindInlet('midievent', this.onMidiEvent.bind(this));
  }

  onMidiEvent(...midievent) {
    if (this.pluginStr) {
      const midiNote = MidiNote(midievent);
      if (midiNote.isNoteOff) {
        console.log('is note off');
        this.midiHandler.outlet(JSON.stringify(midiNote));
        return;
      }
      const commands = exec(this.pluginStr, midiNote);
      this.dump(commands);
    } else {
      alert('no plugin');
    }
  }

  registerPlugin(funcStr) {
    this.pluginStr = funcStr;
    alert('Updated Plugin');
    if (window.isBrowser) {
      this.fireMockMidiEvents();
    }
  }

  // @TODO: TypeCheck here.
  // Type must meet CommandType || Array[CommandType].
  dump(commands) {
    commands.forEach(command => this.midiHandler.outlet(JSON.stringify(command)));
  }

  fireMockMidiEvents() {
    const MOCK_NOTE_ON = [144, 60, 127];
    const MOCK_NOTE_OFF = [144, 60, 0];
    this.onMidiEvent(...MOCK_NOTE_ON);
    setTimeout(() => {
      this.onMidiEvent(...MOCK_NOTE_OFF);
    }, 1500);
  }
}

export default new App();
