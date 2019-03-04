/* eslint-disable */
export default `
(rawNote) => {
  const transposed = MidiNote.clone(rawNote).transpose(5).delay(50);
  const notes = [rawNote, transposed];

  return notes;
}
`;
