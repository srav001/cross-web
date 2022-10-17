/**
 * A config object that is used to update the common values in package.json file.
 * Can be expanded if needed
 * */
export const defaultPckgJSONconfig = {
	toDelete: ['repository', 'author', 'license', 'homepage', 'bugs'],
	toReplace: [
		{
			key: 'name',
			value: ''
		},
		{
			key: 'version',
			value: '0.0.1'
		}
	]
};

export const pckgMngrsData = {
	pnpm: {
		prefix: ''
	},
	npm: {
		prefix: 'run'
	},
	yarn: {
		prefix: ''
	}
};
