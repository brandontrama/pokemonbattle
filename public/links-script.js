const linkForm = document.getElementById('linkForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formButton = document.getElementById('formButton');
    formButton.textContent = 'Checking...';
    const formData = new URLSearchParams();
    const initialLink = document.getElementById('initialLink').value;
    console.log(initialLink);
    formData.append('initialLink', initialLink);
    fetch('http://localhost:8000/test/links/add', {method: 'POST', body: formData})
        .then(statusCheck)
        .then(resp => resp.json())
        .then(result => {grabLinks(result);})
        .catch(handleError);
});

async function grabLinks(resp) {
    const result = await resp;
    console.log('All Links:', result.all);
    console.log('Good Links:', result.good);
    console.log('Bad Links:', result.bad);
    const linksContainer = document.getElementById('linksContainer');
    linksContainer.style.display = 'block';
    clearContainers();
    addGoodLinks(result);
    addBadLinks(result);
    const formButton = document.getElementById('formButton');
    formButton.textContent = 'Check Again';
}

function clearContainers() {
    const goodLinks = document.getElementById('goodLinksContainer');
    goodLinks.innerHTML = '';
    const badLinks = document.getElementById('badLinksContainer');
    badLinks.innerHTML = '';
}

function addGoodLinks(resp) {
    const links = document.getElementById('goodLinksContainer');
    resp.good.forEach(link => {
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(link));
        links.appendChild(p);
    });
}

function addBadLinks(resp) {
    const links = document.getElementById('badLinksContainer');
    resp.bad.forEach(link => {
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(link));
        links.appendChild(p);
    });
}

async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}

function handleError(error) {
    console.log(error);
}