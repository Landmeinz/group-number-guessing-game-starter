$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")

  $('#submitBtn').on('click', postPlayerData);
  $('#restartGame').on('click', getStartGame);
  getPlayerData();
}

function getStartGame () {
  $.ajax({
    method: 'GET',
    url: '/startGame'
  }).then(function (response) {
    console.log('Successful getStartGame', response);
    getPlayerData(response);
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
  //console.log('areDuplicateInputs', areDuplicateInputs());
  
  $.ajax({
    method: 'POST',
    url: '/playerData',
    data: {
      "Eric": $('#EricInput').val(),
      "Nick": $('#NickInput').val(),
      "Hamsa": $('#HamsaInput').val(),
      "Matt": $('#MattInput').val(),
      "Jordan": $('#JordanInput').val()
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
  console.log('playerData', playerData);
  let container = $('#container');
  container.empty();

  $(`#winnerContainer`).empty(); 
  $(`#winnerContainer`).css("display", "none")
  
  //Create a table, etc. for each player and append
  for (let player of playerData){
    //console.log('player', player)
    //$(playerData).append(``)

    //create the player Name and table head
    let playerHeader = `<h3>${player.name}</h3><input class="text-input" placeholder="next guess" id="${player.name}Input">`;
    let tableHead = `
    <thead> 
      <tr>
        <th>Previous Guess:</th>
        <th>Feedback:</th>
      </tr>
    </thead>`;
    let tableBody = $('<div="box"><tbody></tbody><div>');
    
    //Add a row for each player guess
    for(let guess of player.guesses){
      let row = '';
      if(!guess){
        continue;
      }
      //console.log('guess', guess);
      let previousGuess = guess[0];
      let feedback = guess[1];

      if(feedback === `Just Right`){
        announceWinner(player.name)
      }

      row = `
        <tr>
          <td>${previousGuess}</td>
          <td>${feedback}</td>
        </tr>
        `;

        tableBody.append(row);
    }

    //add it all to the DOM
    container.append(playerHeader);
    container.append(tableHead);
    container.append(tableBody);

    // Incrementing round number
    $('#roundCount').text(player.guesses.length+1);
    
  }

} // end render



function announceWinner(name){
  $(`#winnerContainer`).append(`
    <h2>${name}</h2>
  `)
  $(`#winnerContainer`).css("display", "grid")
}



function areDuplicateInputs(){
  let inputs = $('.text-input');
  let inputArr = inputs.map(el => {
    console.log(el);
  });

  console.log('inputArr = ', inputs);

  for(let i=0; i<inputArr.length - 1; i++){
    for(let j=i+1; j<inputArr.length; j++){
      if(inputArr[i] === inputArr[j]){
        return true;
      }
    }
  }

  return false;
}