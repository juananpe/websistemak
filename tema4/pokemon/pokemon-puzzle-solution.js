class Pokemon {

    static activePokemon = null;
    static keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    };

    constructor(name, sprite) {
        this.name = name;
        this.sprite = sprite;
        this.element = this.createElement();
        this.addEventListeners();
    }
    
    createElement() {
        const img = document.createElement('img');
        img.src = this.sprite;
        img.style.position = 'absolute';
        img.style.top = Math.ceil(Math.random()*100) + 'px';
        img.style.left = Math.ceil(Math.random()*100) + 'px';
        document.body.appendChild(img);
        return img;
    }
    
    addEventListeners() {
        this.element.addEventListener('click', () => {
            Pokemon.activePokemon = this;
        });
    }
    
    move(step) {
        let top = parseInt(this.element.style.top);
        let left = parseInt(this.element.style.left);
        if (Pokemon.keys.ArrowUp) this.element.style.top = (top - step) + 'px';
        if (Pokemon.keys.ArrowDown) this.element.style.top = (top + step) + 'px';
        if (Pokemon.keys.ArrowLeft) this.element.style.left = (left - step) + 'px';
        if (Pokemon.keys.ArrowRight) this.element.style.left = (left + step) + 'px';
    }
}


document.addEventListener('keydown', function (event) {
    if (Pokemon.keys.hasOwnProperty(event.key)) Pokemon.keys[event.key] = true;
});

document.addEventListener('keyup', function (event) {
    if (Pokemon.keys.hasOwnProperty(event.key)) Pokemon.keys[event.key] = false;
});

function moveActivePokemon() {
    const step = 5;
    if (Pokemon.activePokemon) {
        Pokemon.activePokemon.move(step);
    }
}

setInterval(moveActivePokemon, 10);

// Instantiate Pokémon
const pokemonNames = ['pikachu', 'bulbasaur', 'charmander', 'squirtle', 'jigglypuff'];

pokemonNames.forEach(name => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(r => r.json())
        .then(data => {
            new Pokemon(name, data.sprites.front_shiny);
        });
});

