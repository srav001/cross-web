import { executeWithSync, getUserInput, getUserOption } from './utils.js';
import { renameSync } from 'node:fs';

const init = async (config = {}) => {
	const defaultConfig = {
		currPath: './cross-web'
	};

	if (Object.keys(config).length === 0) Object.assign(config, defaultConfig);

	try {
		const newPath = await getUserInput();

		const pckgMngr = await getUserOption();
		const setupCommandPrefix = pckgMngr === 'npm' ? 'npm run' : pckgMngr;

		executeWithSync('git clone https://github.com/srav001/cross-web.git');
		renameSync(config.currPath, newPath);

		executeWithSync(`cd ${newPath} && ${setupCommandPrefix} project-setup`);
	} catch (err) {
		console.error(err);
	}

	console.log('done!');
	process.exit(0);
};

init();

export { init };
