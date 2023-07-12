import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import autoPreFixer from 'autoprefixer';
import StylelintPlugin from 'stylelint-webpack-plugin';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';


function configFactory(): Configuration {
    const ext = {
        ts: /\.(ts)x?$/,
        image: /\.(png|svg|jpg|jpeg|gif)$/i,
        sass: /\.s[ac]ss$/i,
    };
    const buildPath = 'build';
    const devMode = process.env.NODE_ENV === 'development';
    const prodMode = process.env.NODE_ENV === 'production';

    const devServer: DevServerConfiguration = devMode ? {
        static: path.join(__dirname, buildPath),
        compress: false,
        port: 3006,
        open: true, // "Google Chrome"
        historyApiFallback: true,
        client: {
            overlay: false,
            logging: 'warn' // Want to set this to 'warn' or 'error'
        },
        proxy: {  // Front-end and back-end separation
            '/api': {
                target: 'http://localhost:8000',
                pathRewrite: {'^/api': ''}
            }
        }
    } : {};

    return {
        entry: './src/index.tsx',
        mode: devMode ? 'development' : prodMode ? 'production' : 'none',
        devtool: devMode ? 'source-map' : false,

        module: {
            rules: [
                {
                    test: ext.image,
                    exclude: /node_modules/,
                    loader: 'url-loader',
                    options: {
                        limit: 500,
                        name: 'images/[name]_[hash:7].[ext]',
                    }
                },
                {
                    test: ext.ts,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            // presets: [
                            //     "@babel/preset-env",
                            //     "@babel/preset-react",
                            //     "@babel/preset-typescript",
                            // ],
                            sourceMap: devMode,
                        },
                    },
                },
                {
                    test: ext.sass,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader, // for extracting not for minimizing
                            options: {
                                // publicPath: ""
                                // publicPath: (resourcePath:any, context:any) => path.relative(path.dirname(resourcePath), context) + '/',
                            },
                        },
                        // "style-loader",
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                sourceMap: devMode,
                                // importLoader: 1   // When using postCSS with nextCSS (no @import resolver) you'll want to set importLoaders. But when using sass, it already handles the @import statements.
                            }
                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [autoPreFixer()],
                                },
                                sourceMap: devMode,
                            }
                        },

                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: devMode,
                            }
                        }
                    ]
                },

            ],
        },
        devServer,
        resolve: {
            modules: ['node_modules', 'react'],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
        output: {
            path: path.resolve(__dirname, buildPath),
            filename: devMode ? '[name].js' : '[name].[chunkhash].js',
            publicPath: '/'
        },
        optimization: {
            minimize: prodMode,
            minimizer: [
                `...`, // For webpack@5 extend existing minimizers
            ],
            runtimeChunk: devMode ? 'single' : undefined,
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: devMode ?
                            (module: any) => {
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];                            // get the name node_modules/packageName
                                return `npm.${packageName.replace('@', '')}`;                            // npm package names are URL-safe, but some servers don't like @ symbols
                            } :
                            'vendor'
                    },
                },
            }
        },
        plugins: [
            devMode && new ReactRefreshPlugin(),
            prodMode ? new CleanWebpackPlugin() : Function(),
            new HtmlWebpackPlugin({
                title: 'React-Bunny',
                filename: 'index.html',
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output both options are optional
                filename: devMode ? '[name].css' : '[name].[contenthash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
            }),
            new ForkTsCheckerWebpackPlugin({
                async: false,
                // eslint: {
                //     files: './src/**/*.{ts,tsx}',
                // },
            }),
            // new StylelintPlugin({
            //     files: ['**/*.{scss,sass}'],
            //     configFile: 'stylelint.config.js',
            //     // context: 'src',
            //     // failOnError: true,
            //     // quiet: false,
            // }),
            // devMode?new webpack.HotModuleReplacementPlugin():Function()
        ],
        target: devMode ? 'web' : 'browserslist', //default being 'browserlist' since 5.0.0-rc.1,Set to "web" when developing with react-hot-loader
    };
}

export default configFactory;
