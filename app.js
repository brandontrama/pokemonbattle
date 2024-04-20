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
        // creates the empty list of moves
        const moves = [];
        $('#moves > tbody > tr').map((i, el) => {
            // grabs the move name from the table in the website
            const name = $(el).find('.cell-name').text();
            // grabs the damage value from the table in the website
            const dmg = $(el).find('.cell-num').eq(0).text().trim();
            // grabs the pp value from the table in the website
            const pp = $(el).find('.cell-num').eq(2).text().trim();

            // adds each move into the list
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
        .then(resp => resp.json())
        .then(addToList)
        .catch(handleError);
        if (link.toString().includes('http')) {
            links.push(link);
        }
        console.log(goodLinks);
        console.log(badLinks);
    });
    console.log(links);
    res.json(links);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function statusCheck(resp) {
    if (!resp.ok) {
        badLinks.push(resp);
        throw new Error(await resp.text());
    }
    return resp;
}

function addToList(resp) {
    console.log(resp);
    goodLinks.push(resp);
}

function handleError(error) {
    console.log(error);
}