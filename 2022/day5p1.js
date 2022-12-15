const input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split(/\n(?=move)/);

const stacks = [];
const max_stacks = Math.max(...input[0].match(/\d/g));
for (let i = 0; i < max_stacks; i++) {
  stacks.push([]);
}

const crates = input[0].split(/\n/).slice(1, -2);
for (let row of crates) {
  for (let i = 0; i < row.length; i++) {
    if (/[A-Z]{1}/.test(row[i])) {
      stacks[Math.floor(i / 4)].unshift(row[i]);
    }
  }
}

const procedures = input.slice(1);
for (let procedure of procedures) {
  const [count, from, to] = procedure.match(/\d+/g);

  for (let i = 0; i < count; i++) {
    stacks[to - 1].push(stacks[from - 1].at(-1));
    stacks[from - 1].pop();
  }
}

let top_crates = "";
for (let stack of stacks) {
  top_crates += stack.at(-1);
}

console.log(top_crates);
