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

const calories = input
  .map((entry) => entry.reduce((temp, a) => temp + +a, 0))
  .sort((a, b) => (a > b ? -1 : 0))
  .slice(0, 3)
  .reduce((temp, a) => temp + a, 0);

console.log(calories);
