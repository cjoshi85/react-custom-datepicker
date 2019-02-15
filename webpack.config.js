var path = require('path');


const commonLoaders = {
    css: {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    cssModules: {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: true,
        importLoaders: 1,
        localIdentName: '[name]__[local]__[hash:base64:5]'
      }
    }
  }

module.exports = {
    entry: './src/picker.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.global\.css$/,
                use: [
                  'style-loader',
                  commonLoaders.css
                ]
            },
            {
                test: /^((?!\.global).)*\.css$/,
                use: [
                  'style-loader',
                  commonLoaders.cssModules
                ]
            }

        ]
    },
    externals: {
        'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    }
};