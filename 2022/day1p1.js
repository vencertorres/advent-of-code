const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`
  .split(/\s\s/)
  .map((log) => log.split(/\n/));

const calories = Math.max(
  ...input.map((entry) => entry.reduce((temp, a) => temp + +a, 0))
);

console.log(calories);
