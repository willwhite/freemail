module.exports = {
  extends: ['airbnb-base','airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    },
	rules: {
		quotes: [
			"error",
			"single"
		],
		semi: [
			"error",
			"always"
		],
	},
  	ignorePatterns: [
		'.eslintrc.js',
		'**/*.js',
		'**/node_modules/**',
		'**/dist/**',
		'**/test/**',
		'**/templates/**',
		'**/ormconfig.ts',
        '**/migrations/**',
        '**/example/**'
	],
};