export function* createIdGenerator() {
  for (let i = 1; i < Infinity; i++) {
    yield i;
  }
}

export function newFontGenerator(size) {
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
