export interface Move {
  move: { name: string };
  type: {
    name: string;
  };
  pp: number;
  power: number;
}

export interface Moves {
  moves: Move[];
}
