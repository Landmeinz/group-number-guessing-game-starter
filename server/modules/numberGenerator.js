function numberGenerator (){
    let max = 25;
    return Math.ceil(Math.random() * max);
}

module.exports = numberGenerator;