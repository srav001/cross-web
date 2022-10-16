import { executeWithSync, getUserInput, getUserOption } from './utils.js';
import { fsRm, fsRename, updateJsonFile } from './files.js';

const init = async (config = {}) => {
	if (config === {}) {
		console.log('oops...empty paramenters!');
		process.exit(0);
	}
	try {

		const projectName = await getUserInput();

		const pckgMngr = await getUserOption();
		const pckgMngrCommandPrefix = pckgMngr === 'npm' ? 'npm run' : pckgMngr;

		executeWithSync(`git clone ${config.url}`);
		fsRename('cross-vue', projectName);

		config.filesToRemove.forEach(file => {
			fsRm(`${projectName}/${file}`);
		});

		const valuesToUpateInPackageJSON = {
			toDelete: ['repository', 'author', 'license', 'homepage', 'bugs'],
			toReplace: [
				{
					key: 'name',
					value: projectName
				}
			]
		};

		updateJsonFile(`${projectName}/package.json`, valuesToUpateInPackageJSON);

		const valuesToUpateInTauriJSON = {
			toReplace: [
				{
					key: 'package.productName',
					value: projectName,
					deep: true
				},
				{
					key: 'build.beforeDevCommand',
					value: `${pckgMngrCommandPrefix} dev`,
					deep: true
				},
				{
					key: 'build.beforeBuildCommand',
					value: `${pckgMngrCommandPrefix} build`,
					deep: true
				}
			]
		};

		updateJsonFile(`${projectName}/src-tauri/tauri.conf.json`, valuesToUpateInTauriJSON);

		executeWithSync(`cd ${projectName} && ${pckgMngrCommandPrefix} install`);
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
