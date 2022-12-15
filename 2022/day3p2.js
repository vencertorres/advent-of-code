const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`.split(/\n/);

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const priorities = {};
for (let i = 0; i < letters.length; i++) {
  priorities[letters.charAt(i)] = i + 1;
}

const groups = [];
for (let i = 0; i < input.length; i += 3) {
  groups.push([input[i], input[i + 1], input[i + 2]]);
}

const items = groups.map(([rucksack_1, rucksack_2, rucksack_3]) => {
  for (let item of rucksack_1) {
    if (rucksack_2.includes(item) && rucksack_3.includes(item)) {
      return item;
    }
  }
});

const total = items.map((item) => priorities[item]).reduce((a, b) => a + b, 0);

console.log(total);
