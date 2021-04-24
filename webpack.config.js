const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const Paths = {
    SRC: path.join(__dirname, 'src'),
    DIST: path.join(__dirname, 'dist'),
};

const PAGES_DIR = `${Paths.SRC}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((filename) => filename.endsWith('.pug'));

module.exports = {
    // target: "web",
    target: "browserslist",
    entry: {
        app: Paths.SRC,
    },
    output: {
        filename: "main.js",
        path: Paths.DIST
    },
    devServer: {
        contentBase: Paths.DIST,
        open: false,
        port: 1337,
        compress: true,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: "pug-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                loader: 'file-loader',
                options: {
                    name: '/[folder]/[name].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: ""}
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: (url) => {
                                if (url.includes('.png') || url.includes('.jpg') || url.includes('.svg')) {
                                    return false;
                                }

                                return true;
                            },
                        },
                    },
                    "postcss-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[folder]/[name].[ext]'
                }
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        ...PAGES.map((page) => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`,
            scriptLoading: "blocking"
        })),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${Paths.SRC}/images`, to: `${Paths.DIST}/images` }
            ],
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },

    // devtool: "source-map",
};
