/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';
import { println, clearScreen } from '../utils/cli';

function loadAscii(fruit) {
  return readFileSync(path.resolve(__dirname, 'ascii', `${fruit}.txt`)).toString();
}

const fruits = {
  orange: chalk.red(loadAscii('orange')),
  banana: chalk.yellow(loadAscii('banana')),
  apple: chalk.green(loadAscii('apple')),
  papaya: chalk.magenta(loadAscii('papaya')),
};

function renderMessages(messages) {
  return messages.map(msg => `${chalk.green(msg)}`).join('\n');
}


function renderBasket(basket) {
  return `${chalk.blue('Welcome to our store!')}

${chalk.cyan('We have the following products on sale today:')}

${(basket.products).map(p => fruits[p.name]).join('\n')}
`;
}

export default function render(state) {
  const basket = state.get('basket');
  const messages = state.get('messages');

  const basketTpl = basket ? renderBasket(basket.toJS()) : '';
  const messagesTpl = messages ? renderMessages(messages.toJS()) : '';

  clearScreen();
  println(`${basketTpl}\n${messagesTpl}`);
}
