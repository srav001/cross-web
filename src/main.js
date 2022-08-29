import { executeWithSync, getUserInput, getUserOption } from './utils.js';
import { renameSync, rmSync } from 'node:fs';

const init = async (
	config = {
		starterTemplate: 'https://github.com/srav001/cross-web.git',
		filesToRemove: ['LICENSE', 'README.md', '.git']
	}
) => {
	try {
		const newPath = await getUserInput();

		const pckgMngr = await getUserOption();
		const setupCommandPrefix = pckgMngr === 'npm' ? 'npm run' : pckgMngr;

		executeWithSync(`git clone ${config.starterTemplate}`);
		renameSync('cross-web', newPath);

		config.filesToRemove.forEach(file => {
			rmSync(`${newPath}/${file}`, { recursive: true, force: true });
		});

		executeWithSync(`cd ${newPath} && ${setupCommandPrefix} project-setup`);
	} catch (err) {
		console.error(err);
	}

	console.log('done!');
	process.exit(0);
};

init();

export { init };
