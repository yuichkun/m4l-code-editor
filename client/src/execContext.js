/* eslint-disable no-unused-vars, no-eval */
import { withDelay, transpose } from './utils';

export default function (funcStr, midievent) {
  window.withDelay = withDelay;
  window.transpose = transpose;
  const plugin = eval(funcStr);
  // debugger;
  return plugin(midievent);
}
