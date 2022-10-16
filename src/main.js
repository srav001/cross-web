import { fsRm, fsRename, updateJsonFile } from './files.js';
import { pckgMngrsData, defaultPckgJSONconfig } from './defaults.js';
import { execWithSync, getUserInput, getUserOption } from './utils.js';

const init = async (config = {}) => {
	if (config === {}) {
		console.log('oops...empty paramenters!');
		process.exit(1);
	}
	const starterProjects = Object.keys(config);

	const pckgMngrs = Object.keys(pckgMngrsData);

	try {
		const projectName = await getUserInput('Enter project name :', 'starter-template');
		defaultPckgJSONconfig.toReplace[0].value = projectName;

		const pckgMngr = await getUserOption('Choose your package manager', pckgMngrs);
		const pckgMngrCommandPrefix = `${pckgMngr} ${pckgMngrsData[pckgMngr].prefix}`;

		const starterName = await getUserOption('Choose your starter template', starterProjects);

		execWithSync(`git clone ${config.url}`);
		fsRename(starterName, projectName);

		config.filesToRemove.forEach(file => {
			fsRm(`${projectName}/${file}`);
		});

		const valuesToUpateInPckgJSON = defaultPckgJSONconfig;

		updateJsonFile(`${projectName}/package.json`, valuesToUpateInPckgJSON);

		// const valuesToUpateInTauriJSON = config.

		// updateJsonFile(`${projectName}/src-tauri/tauri.conf.json`, valuesToUpateInTauriJSON);

		execWithSync(`cd ${projectName} && ${pckgMngrCommandPrefix} install`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('done!');
	process.exit(0);
};

if (process.env.NODE_ENV === 'dev') {
	(async () => {
		const config = await (await import('../bin/config.js')).config;
		init(config);
	})();
}

export { init };
