import { input } from "./input.mjs";

const FILE = /(?<size>[0-9]+) (?<name>[a-z]+(\.[a-z]{3})?)/;
const DIR_IN = /\$ cd (?<name>[a-z]+|\/)/;
const DIR_OUT = /\$ cd \.\./;

let path = [];
const tree = {};

input.forEach((line) => {
  const nextDirectory = line.match(DIR_IN)?.groups;
  const changeDirectory = line.match(DIR_OUT);
  const file = line.match(FILE)?.groups;

  if (nextDirectory) {
    path.push(nextDirectory.name);
    tree[path.join("/")] = 0;
  }

  if (changeDirectory) {
    path.pop();
  }

  if (file) {
    tree[path.join("/")] += parseInt(file.size, 10);
    for (let i = path.length - 1; i > 0; i--) {
      tree[path.slice(0, -i).join("/")] += parseInt(file.size, 10);
    }
  }
});

const fileSize = Math.min(
  ...Object.values(tree)
    .filter((value) => {
      const unused_space = 70000000 - tree["/"];
      if (unused_space + value >= 30000000) return value;
    })
    .sort((a, b) => a - b)
);

console.log(fileSize);
