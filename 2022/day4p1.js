const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`.split(/\n/);

const ids = [];
for (let i = 0; i < input.length; i++) {
  ids.push(input[i].split(","));
}

function min_max(pair) {
  const [min, max] = pair.split("-");
  return [parseInt(min), parseInt(max)];
}

function generateNums(min, max) {
  const range = [];
  if (min === max) {
    range.push(min);
  } else {
    for (let i = min; i < max + 1; i++) {
      range.push(i);
    }
  }
  return range;
}

let total = 0;
for (let pair of ids) {
  const [min_1, max_1] = min_max(pair[0]);
  const [min_2, max_2] = min_max(pair[1]);

  const range_1 = generateNums(min_1, max_1);
  const range_2 = generateNums(min_2, max_2);

  if (range_1.length > range_2.length) {
    if (range_2.every((id) => range_1.includes(id))) {
      total += 1;
    }
  } else {
    if (range_1.every((id) => range_2.includes(id))) {
      total += 1;
    }
  }
}

console.log(total);
