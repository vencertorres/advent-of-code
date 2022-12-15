const input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const regex =
  /Monkey (?<id>\d):\nStarting items: (?<levels>\d+(,\s\d+)+|\d+)\nOperation: new = old (?<operation>\+|\*) (?<operation_num>\d+|old)\nTest: divisible by (?<test_num>\d+)\n\s\sIf true: throw to monkey (?<true_id>\d+)\n\s\sIf false: throw to monkey (?<false_id>\d+)/gm;

const monkeys = [];
for (let monkey of input.split(/\s\n/)) {
  const matches = monkey.matchAll(regex);
  for (let match of matches) {
    monkeys.push(
      Object.assign(
        {},
        {
          ...match.groups,
          id: parseInt(match.groups.id),
          levels: match.groups.levels
            .split(", ")
            .map((levels) => parseInt(levels)),
          test_num: parseInt(match.groups.test_num),
          true_id: parseInt(match.groups.true_id),
          false_id: parseInt(match.groups.false_id),
          inspected: 0,
        }
      )
    );
  }
}

let mod = 1;
for (let monkey of monkeys) {
  mod *= monkey.test_num;
}

for (let round = 0; round < 10000; round++) {
  for (let monkey of monkeys) {
    let { id, levels, operation, operation_num, test_num, true_id, false_id } =
      monkey;

    levels.forEach((level) => {
      monkey.inspected++;
      if (operation === "+") {
        level += operation_num === "old" ? level : parseInt(operation_num);
      } else if (operation === "*") {
        level *= operation_num === "old" ? level : parseInt(operation_num);
      }

      level = Math.floor(level % mod);

      if (level % test_num === 0) {
        monkeys[true_id].levels.push(level);
      } else {
        monkeys[false_id].levels.push(level);
      }
      monkeys[id].levels = levels.filter((level) => level !== level);
    });
  }
}

const monkey_business = monkeys
  .sort((a, b) => b.inspected - a.inspected)
  .slice(0, 2)
  .reduce((a, b) => a * b.inspected, 1);

console.log(monkey_business);
