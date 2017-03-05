/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';
import { println, clearScreen } from '../utils/cli';

function loadAscii(fruit) {
  return readFileSync(path.resolve(__dirname, 'ascii', `${fruit}.txt`)).toString();
}

function colorProduct(name) {
  switch (name) {
    case 'orange':
      return chalk.red;
    case 'banana':
      return chalk.yellow;
    case 'apple':
      return chalk.green;
    case 'papaya':
      return chalk.magenta;
    default:
      return chalk.green;
  }
}

const fruits = {
  orange: colorProduct('orange')(loadAscii('orange')),
  banana: colorProduct('banana')(loadAscii('banana')),
  apple: colorProduct('apple')(loadAscii('apple')),
  papaya: colorProduct('papaya')(loadAscii('papaya')),
};

function renderMessages(messages) {
  return messages.map(msg => `${chalk.green(msg)}`).join('\n');
}

function renderSelection(basket) {
  const items = basket.getIn(['selection', 'items']).filter(n => n > 0);
  if (items.size === 0) {
    return chalk.yellow('Your basket is currently empty.');
  }

  function printProduct(amount, name) {
    const product = basket.get('products').find(p => p.get('name') === name);
    return `${chalk.cyan(amount)} x ${colorProduct(name)(product.get('label'))}`;
  }

  const total = `Total: $ ${(basket.getIn(['selection', 'price']) / 100).toFixed(2)}`;

  return `
${chalk.blue('Your basket:')}

${items.map(printProduct).join('\n')}

${chalk.underline.cyan(total)}
  `;
}

function renderBasket(basket) {
  return `${chalk.blue('Welcome to our store!')}

${chalk.cyan('We have the following products on sale today:')}

${(basket.get('products')).map(p => fruits[p.get('name')]).join('\n')}

${renderSelection(basket)}
`;
}

export default function render(state) {
  const basket = state.get('basket');
  const messages = state.get('messages');

  const basketTpl = basket ? renderBasket(basket) : '';
  const messagesTpl = messages ? renderMessages(messages) : '';

  clearScreen();
  println(`${basketTpl}\n${messagesTpl}`);
}
