import { execute } from '../src/utils.js';

/**
 * It installs the project dependencies, removes the husky config incase already installed, re-installs husky, and adds a
 * commit-msg hook that runs commitlint
 */
const setup = () =>
	execute(
		'pnpm install && rm -rf .husky && npx husky install && npx husky add .husky/commit-msg \'npx --no -- commitlint --verbose --edit $1\''
	);

// House keeping
/**
 * It runs the prettier command on the src and scripts folders, and overwrites the files with the
 * formatted version
 */
const format = () => execute('npx prettier ./src ./scripts -w');
/**
 * `lint` runs `eslint` on all `.js` files in the `src` and `scripts` directories,
 * ignoring files in the `.gitignore` file, and fixes any errors it finds
 */
const lint = () => execute('npx eslint --ext .js --ignore-path .gitignore --fix src scripts');

export {
	setup,
	format,
	lint
};
