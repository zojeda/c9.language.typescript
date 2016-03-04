module.exports = {
	context: __dirname + "/src",
	entry: "./worker/typescript_handler.ts",
	output: {
		path: __dirname + "/lib/worker",
		libraryTarget: "amd",
		filename: "typescript_handler.js"
	},
	resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
  	extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { 
				test: /\.tsx?$/,
				loader: 'ts-loader' }
    ]
  },
	externals: [
		/plugins\/c9.*/
	]
}