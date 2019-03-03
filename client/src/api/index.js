const MidiNote = ([sys, pitch, velocity]) => ({
  sys,
  pitch,
  velocity,
  delay: 0,
  get isNoteOff() {
    return velocity === 0;
  },
  transpose(interval) {
    const newPitch = this.pitch + interval;
    return {
      ...this,
      pitch: newPitch,
    };
  },
});

export default MidiNote;
