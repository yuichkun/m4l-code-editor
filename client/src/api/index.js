/* eslint-disable no-underscore-dangle */
class MidiNote {
  constructor([sys, pitch, velocity]) {
    this.sys = sys;
    this.pitch = pitch;
    this.velocity = velocity;
    this._delay = 0;
  }

  static clone(that) {
    const _clone = Object.assign(Object.create(Object.getPrototypeOf(that)), that);
    return _clone;
  }

  delay(val) {
    this._delay = val;
    return this;
  }

  getDelay() {
    return this._delay;
  }

  transpose(interval) {
    this.pitch += interval;
    return this;
  }

  formatAsJSON() {
    const output = {
      midievent: [this.sys, this.pitch, this.velocity],
      delay: this.getDelay(),
    };
    return JSON.stringify(output);
  }

  get isNoteOff() {
    return this.velocity === 0;
  }
}

export default MidiNote;
