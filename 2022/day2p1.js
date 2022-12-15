const input = `A Y
B X
C Z`
  .split(/\n/)
  .map((match) => match.split(" "));

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

const moves1 = {
  A: 1,
  B: 2,
  C: 3,
};

const moves2 = {
  X: 1,
  Y: 2,
  Z: 3,
};

const scores = input.map(([opponent, self]) => {
  if (moves1[opponent] === moves2[self]) {
    return moves2[self] + DRAW;
  }

  if (opponent === "A") {
    if (self === "Y") {
      return 2 + WIN;
    } else if (self === "Z") {
      return 3 + LOSE;
    }
  } else if (opponent === "B") {
    if (self === "X") {
      return 1 + LOSE;
    } else if (self === "Z") {
      return 3 + WIN;
    }
  } else if (opponent === "C") {
    if (self === "Y") {
      return 2 + LOSE;
    } else if (self === "X") {
      return 1 + WIN;
    }
  }
});

const total = scores.reduce((a, b) => a + b, 0);

console.log(total);
