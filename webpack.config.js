const path = require('path');

module.exports = {
    entry: {
        app: './client/app.jsx',
        login: './client/homeLogin.jsx',
        edit: './client/edit.jsx',
        profile: './client/profile.jsx',
        score: './client/highScore.jsx',
        io: './client/app.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};