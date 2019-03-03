/* eslint-disable */
export default `
(rawNote) => {
  const transposed = rawNote.transpose(5);
  const notes = [rawNote, transposed];

  return notes;
}
`;
