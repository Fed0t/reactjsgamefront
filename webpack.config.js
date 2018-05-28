var path = require('path');
var webpack = require('webpack');

const RewriteImportPlugin = require("less-plugin-rewrite-import");
require('jquery');

var DIST_DIR = path.resolve(__dirname, "build");
var SRC_DIR = path.resolve(__dirname, "src");

var loaders = [
    {
        "test": /\.js?/,
        "include": SRC_DIR,
        "exclude": /node_modules/,
        "loader": "babel-loader",
        "query": {
            "presets": [
                "es2015",
                "react",
                "stage-2"
            ]
        }
    },
    {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader',
    },
    {
        test: /\.css$/,
        loader: "style-loader!css-loader"
    },
    {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2)$/,
        loader: 'url-loader?limit=1024&name=assets/[name]-[hash:8].[ext]!image-webpack-loader',
    },
];

var config = {
    entry: SRC_DIR + "/app/main.js",
    output: {
        path: DIST_DIR + '/app',
        filename: 'bundle.js',
        publicPath: 'front/build/app/'
    },
    module: {
        loaders: loaders
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules
            options: {
                lessLoader: {
                    lessPlugins: [
                        new RewriteImportPlugin({
                            paths: {
                                '../../theme.config': __dirname + '/src/semantic/theme.config',
                            },
                        }),
                    ],
                }
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]

};
module.exports = config;