import { exec, execSync } from 'child_process';
import inquirer from 'inquirer';

/**
 * It executes a command and logs the output to the console
 */
const execute = command =>
	exec(command, (err, stdout, stderr) => {
		console.log(stdout);
		if (err) console.error(err);
		else if (stderr) console.error(stderr);
	});

/**
 * It executes a command with sync and prints the output to the console
 */
const executeWithSync = command => execSync(command, { stdio: 'inherit' });

/**
 * It asks the user a question, and returns the answer
 * @param [question=Enter project name?] - The question that will be asked to the user.
 * @returns The user input from the inquirer prompt.
 */
const getUserInput = async (question = 'Enter project name ?') => {
	const output = await inquirer.prompt({
		name: 'userInput',
		type: 'input',
		message: question,
		default() {
			return 'starter-template';
		}
	});
	return output.userInput;
};

/**
 * It asks the user a question and returns the answer
 * @param [question=Choose your package manager ?] - The question that will be asked to the user.
 * @param [options] - The options that the user can choose from.
 * @returns The user's choice from the list of options.
 */
const getUserOption = async (question = 'Choose your package manager ?', options = ['npm', 'pnpm']) => {
	const output = await inquirer.prompt({
		name: 'userInput',
		type: 'list',
		message: question,
		choices: options
	});
	return output.userInput;
};

export { execute, executeWithSync, getUserInput, getUserOption };
