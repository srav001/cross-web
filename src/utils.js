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
const execWithSync = command => execSync(command, { stdio: 'inherit' });

/**
 * It asks the user a question, and returns the answer
 * @param [question=Enter user input?] - The question that will be asked to the user.
 * @returns The user input from the inquirer prompt.
 */
const getUserInput = async (question = 'Enter input :', defaultAnswer = 'default') => {
	const output = await inquirer.prompt({
		name: 'userInput',
		type: 'input',
		message: question,
		default() {
			return defaultAnswer;
		}
	});
	return output.userInput;
};

/**
 * It asks the user a question and returns the answer
 * @param [question=Question here ?] - The question that will be asked to the user.
 * @param [options] - The options that the user can choose from.
 * @returns The user's choice from the list of options.
 */
const getUserOption = async (question = 'Question here', options = ['op1', 'op2']) => {
	const output = await inquirer.prompt({
		name: 'userInput',
		type: 'list',
		message: question,
		choices: options
	});
	return output.userInput;
};

export { execute, execWithSync, getUserInput, getUserOption };
