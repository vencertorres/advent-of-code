const input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`.split(/\n/);

const monkeys = [];
for (let line of input) {
  let [monkey, job] = line.split(": ");
  monkeys.push({ name: monkey, job: isNaN(job) ? job : +job });
}

function yell(monkey) {
  if (typeof monkey.job === "number") {
    return monkey.job;
  }

  const [name_1, operator, name_2] = monkey.job.split(" ");
  const num_1 = yell(monkeys.find((_monkey) => _monkey.name === name_1));
  const num_2 = yell(monkeys.find((_monkey) => _monkey.name === name_2));

  return eval(`${num_1} ${operator} ${num_2}`);
}

const root = monkeys.find((monkey) => monkey.name === "root");
const num = yell(root);
console.log(num);
