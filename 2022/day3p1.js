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

const rucksacks = input.map((rucksack) => [
  rucksack.slice(0, rucksack.length / 2),
  rucksack.slice(rucksack.length / 2),
]);

const items = rucksacks.map(([compartment_1, compartment_2]) => {
  for (let item of compartment_1) {
    if (compartment_2.includes(item)) {
      return item;
    }
  }
});

const total = items.map((item) => priorities[item]).reduce((a, b) => a + b, 0);

console.log(total);
