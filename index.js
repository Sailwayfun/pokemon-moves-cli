#!/usr/bin/env node
import { program } from "commander";
const API_ENDPOINT = "https://pokeapi.co/api/v2/";

//define a program
program.name("sail-cli")
    .description("This is a cli tool for printing first 5 pokemon moves.")
    .version("0.0.1");

//define commands
program.command("print")
    .description("Enter a pokemon name and print its first five moves.")
    .argument('<pokemonName>', 'pokemon to search')
    .action((pokemonName) => printFirstFiveMoves(pokemonName));

async function printFirstFiveMoves(pokemonName) {
    const response = await fetch(`${API_ENDPOINT}/pokemon/${pokemonName}`);
    const data = await response.json();

    const firstFiveMoves = data.moves.map(({ move }) => move.name).slice(0, 5);
    console.log(firstFiveMoves);
}

program.parse(process.argv);