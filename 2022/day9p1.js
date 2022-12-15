const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`
  .split(/\n/)
  .map((move) => {
    const [direction, steps] = move.split(" ");
    return [direction, parseInt(steps)];
  });

let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };

const moves = new Set();

for (let move of input) {
  const [direction, steps] = move;

  for (let i = 0; i < steps; i++) {
    switch (direction) {
      case "U":
        head.y -= 1;
        break;
      case "D":
        head.y += 1;
        break;
      case "L":
        head.x -= 1;
        break;
      case "R":
        head.x += 1;
        break;
    }

    const x = head.x - tail.x;
    const y = head.y - tail.y;

    if (Math.abs(x) > 1 || Math.abs(y) > 1) {
      if (x === 0) {
        tail.y += Math.floor(y / 2);
      } else if (y === 0) {
        tail.x += Math.floor(x / 2);
      } else {
        tail.x += x > 0 ? 1 : -1;
        tail.y += y > 0 ? 1 : -1;
      }
    }

    moves.add(`${tail.x}_${tail.y}`);
  }
}

console.log("Part 1:", moves.size);
