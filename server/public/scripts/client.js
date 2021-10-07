$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")

  $('#submitBtn').on('click', postPlayerData);
  $('#restartGame').on('click', getStartGame);
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
      "Eric": $('#ericInput').val(),
      "Nick": $('#nickInput').val(),
      "Hamsa": $('#hamsaInput').val(),
      "Matt": $('#mattInput').val(),
      "Jordan": $('#jordanInput').val()
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
    let playerHeader = `<h3>${player.name}</h3><input class="text-input" placeholder="${player.name}" id="${player.name}Input">`;
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

    // Incrementing round number
    $('#roundCount').text(playerData.length+1);
    
  }

} // end render

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