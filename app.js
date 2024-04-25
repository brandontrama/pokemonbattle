"use strict";

const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use('/public', express.static('public'));
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

async function getPokemonMoves() {
    try {
        // makes request to fetch data from the move database
        const response = await fetch('https://pokemondb.net/move/all');
        // extracts HTML content of the response
        const body = await response.text();
        // loads HTML content into Cheerio
        const $ = cheerio.load(body);
        // creates the empty list of moves
        const moves = [];
        // iterates over each table row containing move data
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
});

async function checkLinks(links){
    let goodLinks = [];
    let badLinks = [];

    async function checkLink(link) {
        try {
            const response = await fetch(link);
            if (response.ok) {
                goodLinks.push(link);
            } else {
                const errorStatus = response.status;
                badLinks.push(`Error ${errorStatus}: ${link}`);
            }
        } catch (error) {
            console.error(error);
            badLinks.push(link);
        }
    }

    for (const link of links) {
        await checkLink(link);
    }

    return {goodLinks, badLinks};
}

// Example usage:
const links = ["https://example.com", "https://nonexistenturl123.com"];

app.get('/test/links', async (req, res) => {
    let links = [];
    let initialLink = req.params['initialLink'];
    const response = await fetch(initialLink);
    const body = await response.json();
    const $ = cheerio.load(body);
    // looping through all anchor tags with an 'href' attribute
    $('a[href]').map((i, el) => {
        console.log($(el).attr('href'));
        // extracting the href attribute value and converting it to a string
        let link = $(el).attr('href').toString();
        // checking if the link includes 'http' (filtering out non-HTTP links)
        if (link.toString().includes('http')) {
            // Adding the HTTP link to the 'links' array
            links.push(link);
        }
    });
    console.log(links);
    // calling the 'checkLinks' function to classify the links into
    // good and bad links
    let classified_links = await checkLinks(links);
    res.json({'all' : links, 'good' : classified_links.goodLinks,
              'bad' : classified_links.badLinks});
});

app.post('/test/links/add', async (req, res) => {
    const initialLink = req.body.initialLink;
    console.log(initialLink);
    const response = await fetch(initialLink);
    const body = await response.text();
    const $ = cheerio.load(body);
    let links = [];
    // looping through all anchor tags with an 'href' attribute
    $('a[href]').map((i, el) => {
        console.log($(el).attr('href'));
        // extracting the href attribute value and converting it to a string
        let link = $(el).attr('href').toString();
        // checking if the link includes 'http' (filtering out non-HTTP links)
        if (link.toString().includes('http')) {
            // Adding the HTTP link to the 'links' array
            links.push(link);
        }
    });
    console.log(links);
    // calling the 'checkLinks' function to classify the links into
    // good and bad links
    let classified_links = await checkLinks(links);
    res.json({'all' : links, 'good' : classified_links.goodLinks,
              'bad' : classified_links.badLinks});

});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function statusCheck(resp) {
    if (!resp.ok) {
        badLinks.push(resp);
    } else {
        goodLinks.push(resp);
    }
}

function handleError(error) {
    console.log(error);
}