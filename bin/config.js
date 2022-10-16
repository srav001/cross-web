export const config = {
	'cross-vue': {
		url: 'https://github.com/srav001/cross-vue.git',
		filesToRemove: ['LICENSE', 'README.md', '.git'],
		jsonsToUpdate: {
			'tauri.conf': {
				toDelete: ['repository', 'author', 'license', 'homepage', 'bugs'],
				toReplace: [
					{
						key: 'package.productName',
						value: '',
						deep: true
					},
					{
						key: 'build.beforeDevCommand',
						value: 'pckgMngrCommandPrefix dev',
						deep: true
					},
					{
						key: 'build.beforeBuildCommand',
						value: 'pckgMngrCommandPrefix} build',
						deep: true
					}
				]
			}
		}
	},
	'next-one': {}
};
