var webpack = require('webpack');

module.exports = {
    entry: {
        entry: './src/scripts/entry.jsx'
    },
    output: {
        path: '',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            loader: "style!css"
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
};
