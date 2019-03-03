/* eslint-disable no-unused-vars, no-eval */
import MidiNote from './api';

export default function (funcStr, midievent) {
  window.MidiNote = MidiNote;
  const plugin = eval(funcStr);
  return plugin(midievent);
}
