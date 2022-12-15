const input = `30373
25512
65332
33549
35390`
  .split(/\n/)
  .map((row) => row.split("").map(Number));

let visible = (input.length - 1 + (input[0].length - 1)) * 2;
for (let i = 1; i < input.length - 1; i++) {
  for (let j = 1; j < input[i].length - 1; j++) {
    checkRowAndColumn(i, j, input[i][j]);
  }
}

function checkRowAndColumn(i, j, current) {
  const top = input.slice(0, i).map((row) => row[j]);
  const bottom = input.slice(i + 1, input.length).map((row) => row[j]);
  const left = input[i].slice(0, j);
  const right = input[i].slice(j + 1, input[i].length);

  const results = [top, left, right, bottom].map((trees) => {
    return trees.every((height) => height < current);
  });

  if (results.some((result) => result === true)) {
    visible++;
  }
}

console.log(visible);
