data = [{
        name: 'Eric',
        wins: 0,
        guesses: [
            ['1', 'Too Low'],
            ['15', 'Too High'],
            ['12', 'Just Right']
        ]
    },
    {
        name: 'Nick',
        wins: 0,
        guesses: [
            ['1', 'Too Low'],
            ['15', 'Too High'],
            ['12', 'Just Right']
        ]
    },
    {
        name: 'Hamsa',
        wins: 0,
        guesses: [
            ['1', 'Too Low'],
            ['15', 'Too High'],
            ['12', 'Just Right']
        ]
    }
];


/*
on client side

for (let player in data) {
    //render name where necessary
    let name = player.name;
    //target table head and put it in there

    for (let guess in player.guesses) {
        //fill the table with guess[0] in guess column
        // and guess[1] in results column;
    }
}

console.log(data);
*/