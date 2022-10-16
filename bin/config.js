export const config = {
	'cross-vue': {
		url: 'https://github.com/srav001/cross-vue.git',
		filesToRemove: ['LICENSE', 'README.md', '.git'],
		jsonsToUpdate: {
			package: {
				toDelete: ['repository', 'author', 'license', 'homepage', 'bugs'],
				toReplace: [
					{
						key: 'name',
						value: ''
					}
				]
			}
		}
	},
	'next-one': {}
};
