on client side

for (let player in data) {
    //render name where necessary
    let name = player.name;
    //target table head and put it in there

    for (let guess in player.guesses) {
        //fill the table with guess[0] in guess column
        // and guess[1] in results column;
        guessRows += `
        <tr>
        <td id="nickPrevious">${guess[0]}</td>
        <td id="nickFeedback">${guess[1]}</td>
        </tr>`
    }
}

console.log(data);

let guessRows = ``

for()


table = `
<h2>${player.name}</h2>
<table>
  <thead> 
    <tr>
      <th>Previous Guess:</th>
      <th>Feedback:</th>
    </tr>
  </thead>
  <tbody>
        ${guessRows}
  </tbody>
</table>

`
function areMultipleDu(){
  let inputs = $('.text-input');
  let inputArr = inputs.map(el => el.val());

  console.log('inputArr = ', inputs);

  for(let i=0; i<inputArr.length - 1; i++){
    for(let j=i+1; j<inputArr.length; j++){
      if(inputArr[i] === inputArr[j]){
        return true;
      }
    }
  }
}