$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
}

function getStartGame () {
  $.ajax({
    method: 'GET',
    url: '/startGame'
  }).then(function (response) {
    console.log('Successful getStartGame', response);
    
  }).catch(function() {
    alert('failed getStartGame');
  })
} // end getStartGame

function getPlayerData() {
  $.ajax({
    method: 'GET',
    url: '/playerData',
  }).then(function (response) {
    console.log('successful getPlayerData', response);
    renderPlayerData(response);
  }).catch(function () {
    alert('Failed getPlayerData')
  })
} // end getPlayerData

function postPlayerData() {
  $.ajax({
    method: 'POST',
    url: '/playerData',
    data: {
      "Eric": 20,
      "Nick": 15,
      "Hamsa": 10,
      "Matt": 5,
      "Jordan": 25
    }
  }).then(function(response) {
    console.log('Successful POST!', response);
    getPlayerData();

  }).catch(function (){
    alert('POST Failed!', response)
  })
} // end postPlayerData

function renderPlayerData(playerData) {
  // empty player data tables before re-render
  //console.log('playerData', playerData);
  let container = $('#container');
  container.empty();
  
  //Create a table, etc. for each player and append
  for (let player of playerData){
    //console.log('player', player)
    //$(playerData).append(``)

    //create the player Name and table head
    let playerHeader = `<h2>${player.name}</h2>`;
    let tableHead = `
    <thead> 
      <tr>
        <th>Previous Guess:</th>
        <th>Feedback:</th>
      </tr>
    </thead>`;
    let tableBody = $('<tbody></tbody>');
    
    //Add a row for each player guess
    for(let guess of player.guesses){
      //console.log('guess', guess);
      let previousGuess = guess[0];
      let feedback = guess[1];
      let row = `
        <tr>
          <td id="nickPrevious">${previousGuess}</td>
          <td id="nickFeedback">${feedback}</td>
        </tr>
        `;

        tableBody.append(row);
    }

    //add it all to the DOM
    container.append(playerHeader);
    container.append(tableHead);
    container.append(tableBody);
    
  }

} // end render