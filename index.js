#!/usr/bin/env node
import { program } from "commander";
import inquirer from "inquirer";
const API_ENDPOINT = "https://pokeapi.co/api/v2/";

//define a program
program.name("sail-cli")
    .description("This is a cli tool for printing first 5 pokemon moves.")
    .version("0.0.1");

//define commands
program.command("print")
    .description("Enter a pokemon name and print its first five moves.")
    .argument('<pokemonName>', 'pokemon to search')
    .action(async (pokemonName) => {
        await fetchFirstFiveMoves(pokemonName);
        await searchMoveDetail();
    });

//store first five moves for searching for details
let firstFiveMoves;

async function fetchFirstFiveMoves(pokemonName) {
    const response = await fetch(`${API_ENDPOINT}/pokemon/${pokemonName}`);
    const data = await response.json();

    firstFiveMoves = data.moves.map(({ move }) => move.name).slice(0, 5);
    console.log(firstFiveMoves);
}

async function searchMoveDetail() {
    const choices = firstFiveMoves;

    inquirer.prompt([
        {
            type: "list",
            name: "moveName",
            message: "Choose one move to look up the details",
            choices
        }
    ]).then(answers => fetchDetails(answers.moveName));

    async function fetchDetails(moveName) {
        const response = await fetch(`${API_ENDPOINT}/move/${moveName}`);
        const data = await response.json();
        console.log(`type: ${data.type.name}`);
        console.log(`PP: ${data.pp}`);
        console.log(`power: ${data.power}`);
    }

}

program.parse(process.argv);