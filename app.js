"use strict";

//const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
//const app = express();

//app.use(express.urlencoded({ extended: true}));
//app.use(express.json());

async function getPokemonMoves() {
    try {
        const response = await fetch('https://pokemondb.net/move/all');
        const body = await response.text();
        const $ = cheerio.load(body);
        const moves = [];
        $('#moves > tbody > tr').map((i, el) => {
            // grabs the move name from the table
            const name = $(el).find('.cell-name').text();
            // grabs the damage value from the table
            const dmg = $(el).find('.cell-num').eq(0).text().trim();
            // grabs the pp value from the table
            const pp = $(el).find('.cell-num').eq(2).text().trim();

            // adds each move into the array
            moves.push({name, dmg, pp});
        });
        fs.writeFile('pokemonMoves.json', JSON.stringify(moves), function(err) {
            if (err) return console.log(err);
            console.log('Moves were saved as: pokemonMoves.json');
        });
    } catch (error) {
        console.log(error);
    }
}

getPokemonMoves();

// app.get('/hello', function (req, res) {
//     res.type("text").send("Hello World");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });