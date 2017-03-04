require('babel-core/register');

const chalk = require('chalk');
const { println, clearScreen } = require('./src/utils/cli');
const inquirer = require('inquirer');
const runCliApp = require('./src/app_cli').default;
const execSync = require('child_process').execSync;

clearScreen();

println(chalk.blue('Welcome to the basket'));
println();

const cliOrBrowser = {
  name: 'environment',
  type: 'list',
  message: chalk.yellow('What kind of UI would like to use?'),
  choices: ['browser', 'cli'],
  default: 'browser',
};

inquirer.prompt([cliOrBrowser]).then(({ environment }) => {
  if (environment === 'cli') {
    process.stdin.resume();
    runCliApp();
  } else {
    println('Just a minute, bundling assets and launching browser...');
    println(chalk.magenta('Press CTRL+C to exit'));
    execSync('./node_modules/.bin/webpack-dev-server');
    println(chalk.blue('Goodbye! 🖖'));
  }
});
