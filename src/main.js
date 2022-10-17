import { existsSync } from 'node:fs';
import { fsRm, fsRename, updateJsonFile } from './files.js';
import { pckgMngrsData, defaultPckgJSONconfig } from './defaults.js';
import { execWithSync, getUserInput, getUserOption } from './utils.js';

const init = async (options = {}) => {
	if (Object.keys(options)?.length === 0) {
		console.log(
			'Something went wrong. Empty parameters recieved! \n\nPlease report to - https://github.com/srav001/cross-web/issues \n'
		);
		process.exit(1);
	}
	const starterProjects = Object.keys(options);

	const pckgMngrs = Object.keys(pckgMngrsData);

	try {
		const projectName = await getUserInput('Enter project name :', 'starter-template');

		if (existsSync(`${projectName}`)) {
			console.error('\n Oops...The path exists. Try again please ! \n');
			init(options);
			return false;
		}

		console.log('\n');
		defaultPckgJSONconfig.toReplace[0].value = projectName;

		const pckgMngr = await getUserOption('Choose your package manager', pckgMngrs);
		const pckgMngrCommandPrefix = `${pckgMngr} ${pckgMngrsData[pckgMngr].prefix}`;

		console.log('\n');

		const starterName = await getUserOption('Choose your starter template', starterProjects);

		const config = options[starterName];

		console.log('\n');

		let cloning = true;
		execWithSync(`git clone ${config.url}`);
		cloning = false;
		fsRename(starterName, projectName);

		config.filesToRemove.forEach(file => {
			fsRm(`${projectName}/${file}`);
		});

		const valuesToUpateInPckgJSON = defaultPckgJSONconfig;

		updateJsonFile(`${projectName}/package.json`, valuesToUpateInPckgJSON);

		// const valuesToUpateInTauriJSON = config.

		// updateJsonFile(`${projectName}/src-tauri/tauri.conf.json`, valuesToUpateInTauriJSON);

		if (cloning === false) execWithSync(`cd ${projectName} && ${pckgMngrCommandPrefix} install`);
	} catch (err) {
		console.log('\n');
		console.log(
			'\nSomething went wrong! Please report with steps to reproduce. \n\nReport here - https://github.com/srav001/cross-web/issues \n'
		);
		if (process.env.NODE_ENV === 'dev') {
			console.error(err);
			process.exit(1);
		} 
		process.exit(0);
	}

	console.log('\ndone!\n');
	process.exit(0);
};

if (process.env.NODE_ENV === 'dev') {
	(async () => {
		const options = await (await import('../bin/options.js')).options;
		init(options);
	})();
}

export { init };
