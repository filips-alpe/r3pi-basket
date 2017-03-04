require("babel-core/register");

const chalk = require("chalk");
const { println, clearScreen } = require("./src/utils/cli");

clearScreen();

println(chalk.blue("Welcome to the basket"));
