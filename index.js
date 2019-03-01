const express = require('express');
const app = express();

app.use(express.static('client'));

app.get('/', (req, res) => {
  console.log('request recieved');
  res.sendFile(__dirname + '/index.html');
});
app.listen(3000, () => { console.log('app started') });