#!/usr/bin/env node
import { program } from "commander";
import inquirer from "inquirer";
import ora from "ora";
const API_ENDPOINT = "https://pokeapi.co/api/v2/";

import type { ListInquiry } from "./types/inquiry.js";
import type { Moves, Move } from "./types/moves.js";

//define a program
program
  .name("sail-cli")
  .description(
    "This is a cli tool for printing and searching for details about first 5 pokemon moves."
  )
  .version("0.0.1");

//define commands
program
  .command("print")
  .description("Enter a pokemon name and print its first five moves.")
  .argument("<pokemonName>", "pokemon to search")
  .action(async (pokemonName) => {
    await fetchFirstFiveMoves<Moves>(pokemonName);
    await searchMoveDetail();
  });

//store first five moves for searching for details
let firstFiveMoves: string[] = [];

async function fetchFirstFiveMoves<T extends Moves>(pokemonName: string) {
  const spinner = ora("Loading moves").start();
  const response = await fetch(`${API_ENDPOINT}/pokemon/${pokemonName}`);
  const data = (await response.json()) as T;
  spinner.stop();

  firstFiveMoves = data.moves.map(({ move }) => move.name).slice(0, 5);
}

async function searchMoveDetail() {
  const choices = firstFiveMoves;

  const listInquiry: ListInquiry = {
    type: "list",
    name: "moveName",
    message: "Choose one move to look up the details",
    choices,
  };

  const answers = await inquirer.prompt(listInquiry);
  await fetchDetails<Move>(answers.moveName);

  async function fetchDetails<T extends Move>(moveName: string) {
    const spinner = ora("Loading move details").start();
    const response = await fetch(`${API_ENDPOINT}/move/${moveName}`);
    const data = (await response.json()) as T;
    spinner.stop();
    console.log(`type: ${data.type.name}`);
    console.log(`PP: ${data.pp}`);
    console.log(`power: ${data.power}`);
  }
}

program.parse(process.argv);
