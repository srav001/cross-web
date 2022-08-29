import { executeWithSync, getUserInput, getUserOption } from './utils.js';
import { fsRm, fsRename, updateJsonFile } from './files.js';

const init = async (
	config = {
		starterTemplate: 'https://github.com/srav001/cross-web.git',
		filesToRemove: ['LICENSE', 'README.md', '.git']
	}
) => {
	try {
		const projectName = await getUserInput();

		const pckgMngr = await getUserOption();
		const pckgMngrCommandPrefix = pckgMngr === 'npm' ? 'npm run' : pckgMngr;

		executeWithSync(`git clone ${config.starterTemplate}`);
		fsRename('cross-web', projectName);

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

init();

export { init };
