const bulbasaur = document.getElementById("bulbasaur");
const charmander = document.getElementById("charmander");
const squirtle = document.getElementById("squirtle");

bulbasaur.addEventListener("mouseover", (event) => {
    event.target.src = "sprites/Gen I/front_sprites/anim/bulbasaur_frontsprite[ANIM].png";
});
bulbasaur.addEventListener("mouseleave", (event) => {
    event.target.src = "sprites/Gen I/front_sprites/reg/bulbasaur_frontsprite.png"
});

charmander.addEventListener("mouseover", (event) => {
    event.target.src = "sprites/Gen I/front_sprites/anim/charmander_frontsprite[ANIM].png";
});
charmander.addEventListener("mouseleave", (event) => {
    event.target.src = "sprites/Gen I/front_sprites/reg/charmander_frontsprite.png"
});

squirtle.addEventListener("mouseover", (event) => {
    event.target.src = "sprites/Gen I/front_sprites/anim/squirtle_frontsprite[ANIM].png";
});
squirtle.addEventListener("mouseleave", (event) => {
    event.target.src = "sprites/Gen I/front_sprites/reg/squirtle_frontsprite.png"
});