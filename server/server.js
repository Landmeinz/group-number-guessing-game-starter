const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
let data = require('./modules/data-draft.js');

const numberGenerator = require('./modules/numberGenerator.js');

let numberToGuess = numberGenerator();
console.log('number to guess', numberToGuess);

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
  addGuessArrays(guesses);
  res.sendStatus(201);
});

// make a function to create a single array to add to data given a singular guess
function createGuessArray(guess) {
  let result = ''; // initialize result
  if (guess === numberToGuess){
    result = 'Just Right';
  } else if (guess < numberToGuess) {
    result = 'Too Low';
  }
  else result = 'Too High';
  return [String(guess), result];
  
}

// function to loop through all of the guesses and add to the 
function addGuessArrays(guesses) {
  let i = 0;
  for (let guesser in guesses) {
    let guess = guesses[`${guesser}`];
    console.log(`${guesser}'s guess is ${guess}`);
    console.log(`Array to add to ${guesser} is: ${createGuessArray(guess)}`);
    data[i].guesses.push(createGuessArray(guess));
    i++;
  }
  console.log(data)
  console.log(data[0].guesses);
  
}