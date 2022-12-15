const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split(/\n/);

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
