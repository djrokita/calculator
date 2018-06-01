const path = require('path');

module.exports = {
    entry: './src/newScript.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }
}