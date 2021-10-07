$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
}

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
    
  })
} // end postPlayerData

function render() {

} // end render