import MidiNote from '../api';

describe('MidiNote', () => {
  let midiNoteOn;
  const MOCK_NOTE_ON = [144, 60, 127];
  const MOCK_NOTE_OFF = [144, 60, 0];
  const MIDI_NOTE_PROPS = ['sys', 'pitch', 'velocity', 'delay', 'transpose', 'isNoteOff'];

  function propsCheck(target) {
    MIDI_NOTE_PROPS.forEach((key) => {
      expect(target).toHaveProperty(key);
    });
  }

  beforeEach(() => {
    midiNoteOn = MidiNote(MOCK_NOTE_ON);
  });

  it('has valid note shape', () => {
    propsCheck(midiNoteOn);
  });

  it('has default value of 0 in delay', () => {
    expect(midiNoteOn.delay).toBe(0);
  });

  it('tranposes pitch', () => {
    const transposed = midiNoteOn.transpose(4);
    propsCheck(transposed);
    expect(midiNoteOn.pitch).toBe(60);
    expect(transposed.pitch).toBe(64);
  });

  it('can chain functions', () => {
    const transposed = midiNoteOn.transpose(4).transpose(-5);
    propsCheck(transposed);
    expect(transposed.pitch).toBe(59);
  });
  it('returns if it is noteoff', () => {
    const midiNoteOff = MidiNote(MOCK_NOTE_OFF);
    propsCheck(midiNoteOff);
    expect(midiNoteOff.isNoteOff).toBe(true);
  });
});
