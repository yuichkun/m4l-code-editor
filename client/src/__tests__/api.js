import MidiNote from '../api';

describe('MidiNote', () => {
  let midiNoteOn;
  const MOCK_NOTE_ON = [144, 60, 127];
  const MOCK_NOTE_OFF = [144, 60, 0];
  const MIDI_NOTE_PROPS = ['sys', 'pitch', 'velocity', '_delay', 'delay', 'transpose', 'isNoteOff', 'formatAsJSON'];

  function typeCheck(target, type) {
    expect(typeof target).toBe(type);
  }

  function propsCheck(target) {
    expect(target instanceof MidiNote).toBe(true);
    MIDI_NOTE_PROPS.forEach((key) => {
      expect(target).toHaveProperty(key);
    });
  }

  beforeEach(() => {
    midiNoteOn = new MidiNote(MOCK_NOTE_ON);
  });

  it('has valid note shape', () => {
    propsCheck(midiNoteOn);
  });

  it('outputs proper json', () => {
    const json = midiNoteOn.formatAsJSON();
    const output = JSON.parse(json);
    expect(output).toHaveProperty('midievent');
    expect(output.midievent).toBeInstanceOf(Array);
    expect(output.midievent.length).toBe(3);
    for (let i = 0; i < 2; i += 1) {
      typeCheck(output.midievent[i], 'number');
    }

    expect(output).toHaveProperty('delay');
    typeCheck(output.delay, 'number');
  });

  it('clones midiNote', () => {
    const clone = MidiNote.clone(midiNoteOn);
    propsCheck(clone);
  });

  it('should not shallow copy', () => {
    const clone = MidiNote.clone(midiNoteOn);
    clone.transpose(4);
    expect(clone.pitch).toBe(64);
    expect(midiNoteOn.pitch).not.toBe(64);

    midiNoteOn.transpose(-5);
    expect(midiNoteOn.pitch).toBe(55);
    expect(clone.pitch).toBe(64);
  });

  it('has default value of 0 in delay', () => {
    expect(midiNoteOn.getDelay()).toBe(0);
  });

  it('can set delay', () => {
    midiNoteOn.delay(4);
    expect(midiNoteOn.getDelay()).toBe(4);
  });

  it('tranposes pitch', () => {
    midiNoteOn.transpose(4);
    propsCheck(midiNoteOn);
    expect(midiNoteOn.pitch).toBe(64);
    midiNoteOn.transpose(-4);
    expect(midiNoteOn.pitch).toBe(60);
  });

  it('can chain transpose', () => {
    midiNoteOn.transpose(4).transpose(-5);
    propsCheck(midiNoteOn);
    expect(midiNoteOn.pitch).toBe(59);
  });

  it('can chain delay', () => {
    midiNoteOn.delay(50).delay(6);
    propsCheck(midiNoteOn);
    expect(midiNoteOn.getDelay()).toBe(6);
  });

  it('can chain transpose and delay', () => {
    midiNoteOn.transpose(5).delay(50);
    propsCheck(midiNoteOn);
    expect(midiNoteOn.pitch).toBe(65);
    expect(midiNoteOn.getDelay()).toBe(50);
  });
  it('can chain delay and transpose', () => {
    midiNoteOn.delay(50).transpose(5);
    propsCheck(midiNoteOn);
    expect(midiNoteOn.pitch).toBe(65);
    expect(midiNoteOn.getDelay()).toBe(50);
  });

  it('can chain transpose, delay, transpose', () => {
    midiNoteOn.transpose(5).delay(50).transpose(-6);
    propsCheck(midiNoteOn);
    expect(midiNoteOn.pitch).toBe(59);
    expect(midiNoteOn.getDelay()).toBe(50);
  });

  it('returns if it is noteoff', () => {
    const midiNoteOff = new MidiNote(MOCK_NOTE_OFF);
    propsCheck(midiNoteOff);
    expect(midiNoteOff.isNoteOff).toBe(true);
  });
});
