/* eslint-disable max-len */
export const transpose = interval => ([sys, pitch, velocity]) => ([sys, pitch + interval, velocity]);
export const withDelay = delay => midievent => ({ midievent, delay });
export const isNoteOff = ([sys, pitch, velocity]) => velocity === 0; /* eslint-disable-line */
