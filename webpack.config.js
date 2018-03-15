var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/js/app.js', './src/scss/styles.scss'],
    output: {
        filename: './dist/js/bundle.js'
    },
    watch: true,
    mode: 'development',
    module: {
        rules: [
            /*
            your other rules for JavaScript transpiling go in here
            */
            { // css / sass / scss loader for webpack
                test: /\.(css|sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: './dist/css/test.bundle.css',
            allChunks: true,
        }),
    ],
};