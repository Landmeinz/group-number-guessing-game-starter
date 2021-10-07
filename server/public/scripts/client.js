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
    render(response);
  }).catch(function () {
    alert('Failed getPlayerData')
  })
} // end getPlayerData

function postPlayerData() {
  $.ajax({
    method: 'POST',
    url: '/playerData',
    data: {
      Eric: 20,
      Nick: 15,
      Hamsa: 10,
      Matt: 5,
      Jordan: 25
    }
  }).then(function(response) {
    console.log('Successful POST!', response);
    getPlayerData();

  }).catch(function (){
    alert('POST Failed!', response)
  })
} // end postPlayerData

function renderPlayerData(playerData) {
  // empty player date tables before re-render
  $(playerData).empty()
  for (let player of playerData){
    //$(playerData).append(``)
    let playerTable = $('<tbody></tbody>');
    
    for(let guess of player.guesses){
      let previousGuess = guess[0];
      let feedback = guess[1];
      let row = `
        <tr>
          <td id="nickPrevious">${previousGuess}</td>
          <td id="nickFeedback">${feedback}</td>
        </tr>
        `
    }


    
  }

} // end render