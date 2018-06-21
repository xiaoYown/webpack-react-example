const path =	require('path');
const config = 	require('../config');
const webpack =	require('webpack');
const merge =	require('webpack-merge');
const HtmlWebpackPlugin =	require('html-webpack-plugin');
const utils =	require('./utils');
const baseWebpack =	require('./webpack.config');

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);

var plugins = [
	// new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.DefinePlugin({
		'process.env': config.dev.env
    }),
	new webpack.NoErrorsPlugin(),
	new webpack.HotModuleReplacementPlugin()
];

Object.keys(baseWebpack.entry).forEach(function(name){

	baseWebpack.entry[name] = ['./build/dev-client'].concat(baseWebpack.entry[name]);

	var plugin = new HtmlWebpackPlugin({
		filename: name + '.html',
		template: path.resolve(__dirname, `../src/pages/${name}.html`), // page entries
		favicon: config.dev.favicon,
		inject: true,
		chunks: [name]
	});
	plugins.push(plugin);
});

var newWebpack = merge(baseWebpack, {
	module: {
		loaders: utils.styleLoaders({ sourceMap: false })
	},
	devtool: '#eval-source-map',
  	plugins: plugins
});

module.exports = newWebpack;

