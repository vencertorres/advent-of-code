const input = `A Y
B X
C Z`
  .split(/\n/)
  .map((match) => match.split(" "));

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

const moves = {
  A: 1,
  B: 2,
  C: 3,
};

function evaluate(opponent, result) {
  if (result === "Y") {
    return moves[opponent] + DRAW;
  }

  if (result === "X") {
    if (opponent === "A") {
      return 3 + 0;
    } else if (opponent === "B") {
      return 1 + 0;
    } else if (opponent === "C") {
      return 2 + 0;
    }
  } else if (result === "Z") {
    if (opponent === "A") {
      return 2 + 6;
    } else if (opponent === "B") {
      return 3 + 6;
    } else if (opponent === "C") {
      return 1 + 6;
    }
  }
}

const scores = input.map((move) => evaluate(move[0], move[1]));

const total = scores.reduce((temp, a) => temp + a, 0);

console.log(total);
