var webpack = require("webpack");

module.exports = {
  entry: __dirname+'/src/app.jsx',
  output: {
      path: __dirname + '/public',
      filename: 'todo.js'
  },
  resolve: {
    extensions: ['', ".js", ".jsx", ".es6"]
  },
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // },
  module: {
    loaders: [{
      test: /(\.jsx?$|\.es6?$)/,
      loader: 'babel',
      query:
      {
          presets:['es2015', 'react']
      },
      exclude: /(node_modules|lib)/
    }]
  }
}