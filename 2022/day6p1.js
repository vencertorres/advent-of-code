const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

function countInstances(arr) {
  return arr.reduce((chars, char) => {
    const count = chars[char] ?? 0;
    return {
      ...chars,
      [char]: count + 1,
    };
  }, {});
}

for (let i = 0; i < input.length; i++) {
  const instances = countInstances(Array.from(input.slice(i, i + 4)));
  if (Object.values(instances).every((count) => count === 1)) {
    const marker = i + 4;
    console.log(marker);
    break;
  }
}
