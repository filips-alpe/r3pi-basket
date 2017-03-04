export function println(text = '') {
  process.stdout.write(`${text}\n`);
}

export function clearScreen() {
  process.stdout.write('\x1Bc');
}
