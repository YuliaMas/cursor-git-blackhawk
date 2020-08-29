function* createIdGenerator() {
  for (let i = 1; i < Infinity; i++) {
    yield i;
  }
}
const idGenerator = createIdGenerator();

////////////////////////////////////

function newFontGenerator(size) {
  const sensitiveKeyCode = {
    next(key) {
      switch (key) {
        case "up":
          size += 2;
          break;
        case "down":
          size -= 2;
          break;
        default:
          size += 0;
          break;
      }
      return {
        done: false,
        value: size,
      };
    },
  };
  return sensitiveKeyCode;
}
const fontGenerator = newFontGenerator(14); // 14 – стартове значення
console.log(fontGenerator.next("up").value); // -> 16
console.log(fontGenerator.next("down").value); //-> 14
console.log(fontGenerator.next().value);
console.log(fontGenerator.next().value);
console.log(fontGenerator.next().value);
console.log(fontGenerator.next().value);
console.log(fontGenerator.next("up").value); //-> 16
console.log(fontGenerator.next().value); // -> 16
console.log(fontGenerator.next("down").value); //-> 14
console.log(fontGenerator.next("down").value); //-> 12
console.log(fontGenerator.next("down").value); //-> 10
console.log(fontGenerator.next().value); //-> 10
console.log(fontGenerator.next("up").value); //-> 12
