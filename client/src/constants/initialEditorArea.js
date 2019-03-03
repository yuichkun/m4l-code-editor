/* eslint-disable */
export default `
(midievent) => {
  const dryNote = withDelay(0)(midievent);
  const notes = [dryNote];

  for(let i = 0; i < 20; i++){
    const rndInterval = Math.floor(Math.random() * 10) - 5;
    const newNote = withDelay(0)(transpose(rndInterval)(midievent));
    notes.push(newNote);
  }

  return notes;
}
`;
