const input = `30373
25512
65332
33549
35390`
  .split(/\n/)
  .map((row) => row.split("").map(Number));

let scenic_scores = [];
input.forEach((row, i) => {
  row.forEach((height, j) => {
    countTrees(i, j, height);
  });
});

function mapRowAndColumn(i, j) {
  const top = input
    .slice(0, i)
    .map((row) => row[j])
    .reverse();
  const bottom = input.slice(i + 1, input.length).map((row) => row[j]);
  const left = input[i].slice(0, j).reverse();
  const right = input[i].slice(j + 1, input[i].length);

  return [top, bottom, left, right];
}

function countTrees(i, j, current) {
  const [top, bottom, left, right] = mapRowAndColumn(i, j);

  let score = 1;
  [top, left, right, bottom].forEach((trees) => {
    let count = 0;
    for (let height of trees) {
      if (height >= current) {
        count++;
        break;
      } else if (height < current) {
        count++;
      }
    }
    score *= count;
  });
  scenic_scores.push(score);
}

console.log(Math.max(...scenic_scores));
