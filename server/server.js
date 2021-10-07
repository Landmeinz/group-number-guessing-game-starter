const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
let data = require('./modules/data-draft.js');

const numberGenerator = require('./modules/numberGenerator.js');

let numberToGuess = numberGenerator();
console.log('number to guess', numberToGuess);

function createGuessArray(guess) {
  let result = '';
  if (guess === numberToGuess){
    result = 'Just Right';
  } else if (guess < numberToGuess) {
    result = 'Too Low';
  }
  else result = 'Too High';
  console.log('resulting array is [${guess}, ${result}]');
  return [guess, result];
}



// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

// create server-side get function to send updated player guess data
app.get('/playerData', (req, res) => {
  res.send(data);
});

app.post('/playerData', (req, res) => {
  console.log('This is players req.body', req.body);
  let guesses = req.body;
  console.log('Eric guess is: ', guesses.Eric);
  let arrayToAdd = createGuessArray(guesses.Eric);
  console.log('Array to add is:', arrayToAdd);
  data[0].guesses.push(arrayToAdd);
  console.log(data);
  res.sendStatus(201);
});

function addGuessArrays(guesses) {
  for (let i=0; i < data.length; i++) {
    
  }
}