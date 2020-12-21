// Consult https://www.snowpack.dev to learn about these options
module.exports = {
	extends: '@sveltejs/snowpack-config',
	install: ['axios'],
	mount: {
		'src/components': '/_components',
		'src/actions': '/_actions',
		'src/stores': '/_stores',
		'src/utils': '/_utils',
		'src/reducers': '/_reducers',
		'src/constants': '/_constants',
		'src/interceptors': '/_interceptors',
	},
	alias: {
		$components: './src/components',
		$actions: './src/actions',
		$stores: './src/stores',
		$utils: './src/utils',
		$constants: './src/constants',
		$reducers: './src/reducers',
		$interceptors: './src/interceptors',
	}
};
