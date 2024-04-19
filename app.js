"use strict";

const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use('/public', express.static('public'));
app.use(cors());

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

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
app.get('/hello', (req, res) => {
    res.type('text').send("Hello World!");
})
app.get('/test/links', async (req, res) => {
    console.log("to");
    let links = [];
    const response = await fetch('https://siena.edu/');
    const body = await response.text();
    const $ = cheerio.load(body);
    const moves = [];
    $('a[href]').map((i, el) => {
        console.log($(el).attr('href'));
        let link = $(el).attr('href').toString();
        let goodLinks = []
        let badLinks = []
        fetch(link)
        .then(statusCheck)
        .then(addToList)
        .catch(handleError);
        links.push(link);
    });
    res.json(links);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}

function addToList(link) {
    if (link) {
        
    } else {

    }
}

function handleError(error) {
    console.log(error);
}