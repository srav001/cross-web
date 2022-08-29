module.exports = {
	env: {
		node: true,
		'es2021': true
	},
	extends: ['eslint:recommended',	'prettier'],
	parserOptions: {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	rules: {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};