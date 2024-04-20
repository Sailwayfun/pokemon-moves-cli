#!/usr/bin/env node
const API_ENDPOINT = "https://pokeapi.co/api/v2/";

async function printFirstFiveMoves(pokemonName) {
    const response = await fetch(`${API_ENDPOINT}/pokemon/${pokemonName}`);
    const data = await response.json();

    const firstFiveMoves = data.moves.map(({ move }) => move.name).slice(0, 5);
    console.log(firstFiveMoves);
}

printFirstFiveMoves("charmander");