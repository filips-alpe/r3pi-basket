/* eslint-disable import/no-extraneous-dependencies */
import inquirer from 'inquirer';
import chalk from 'chalk';
import { addToBasket, removeFromBasket, clearBasket } from '../../ducks/basket';

function getQuestion(state) {
  const items = state.getIn(['basket', 'selection', 'items']).filter(amount => amount !== 0).keySeq();
  const totalPrice = (state.getIn(['basket', 'selection', 'price']) / 100).toFixed(2);

  const choices = [
    { name: 'Add an orange, $ 0.30', value: 'orange' },
    { name: 'Add a banana, $ 0.15', value: 'banana' },
    { name: 'Add an apple, $ 0.25', value: 'apple' },
    { name: 'Add a papaya, $ 0.50', value: 'papaya' },
    items.includes('orange') ? { name: 'Remove an orange, - $ 0.30', value: '-orange' } : false,
    items.includes('banana') ? { name: 'Remove a banana, - $ 0.15', value: '-banana' } : false,
    items.includes('apple') ? { name: 'Remove an apple, - $ 0.25', value: '-apple' } : false,
    items.includes('papaya') ? { name: 'Remove a papaya, - $ 0.50', value: '-papaya' } : false,
    items.size ? { name: `Clear basket: - $ ${totalPrice}`, value: 'clear' } : false,
    items.size ? { name: `Purchase: $ ${totalPrice}`, value: 'purchase' } : false,
    { name: 'Exit', value: 'exit' },
  ].filter(c => !!c);

  return {
    name: 'answer',
    type: 'list',
    message: chalk.yellow('What would you like to do?'),
    choices,
  };
}

export default function promptMiddleware(store) {
  return next => (action) => {
    const result = next(action);

    const question = getQuestion(store.getState());
    inquirer.prompt([question]).then(({ answer }) => {
      switch (answer) {
        case 'orange':
        case 'banana':
        case 'apple':
        case 'papaya':
          store.dispatch(addToBasket(answer));
          break;
        case '-orange':
        case '-banana':
        case '-apple':
        case '-papaya':
          store.dispatch(removeFromBasket(answer.replace('-', '')));
          break;
        case 'clear':
          store.dispatch(clearBasket());
          break;
        case 'purchase':
          process.stdout.write(chalk.bold.red('Not enough money! Please insert coins and try again!'));
          process.exit(0);
          break;
        case 'exit':
          process.stdout.write(chalk.bold.blue('Goodbye!'));
          process.exit(0);
          break;
        default:
          break;
      }
      process.stdin.resume();
    });

    return result;
  };
}
