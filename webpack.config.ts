import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import autoPreFixer from 'autoprefixer';
import StylelintPlugin from 'stylelint-webpack-plugin';
import {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import {Configuration} from 'webpack';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

function configFactory(): Configuration {
    const ext = {
        ts: /\.(ts)x?$/,
        image: /\.(png|svg|jpg|jpeg|gif)$/i,
        sass: /\.s[ac]ss$/i,
    }, buildPath = 'public';
    const isDev = process.env.NODE_ENV === 'development';
    const isProd = process.env.NODE_ENV === 'production';
    const {DEV_PORT, DEV_API_PORT} = process.env;

    const devServer: DevServerConfiguration = isDev ? {
        static: path.join(__dirname, buildPath),
        compress: false,
        port: DEV_PORT,
        open: true,  // Open the default browser when there is no browser open
        historyApiFallback: true,
        client: {
            overlay: false,
            logging: 'warn' // Want to set this to 'warn' or 'error'
        },
        proxy: {  // Front-end and back-end separation
            '/api/v1': {
                target: `http://localhost:${DEV_API_PORT}`,
            }
        }
    } : {};

    return {
        entry: './src/index.tsx',
        mode: isDev ? 'development' : isProd ? 'production' : 'none',
        devtool: isDev ? 'source-map' : false,
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
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                sourceMap: isDev,
                            }
                        }],
                },
                {
                    test: ext.sass,
                    exclude: /node_modules/,
                    use: [{
                        loader: MiniCssExtractPlugin.loader, // for extracting not for minimizing
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev,
                            // importLoader: 1   // When using postCSS with nextCSS (no @import resolver) you'll want to set importLoaders. But when using sass, it already handles the @import statements.
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoPreFixer()],
                            },
                            sourceMap: isDev,
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
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
            alias: {'data-structure-typed': path.resolve(__dirname, 'src/packages/data-structures')}
        },
        output: {
            path: path.resolve(__dirname, buildPath),
            filename: isDev ? '[name].js' : '[name].[chunkhash].js',
            publicPath: '/'
        },
        optimization: {
            minimize: isProd,
            minimizer: [
                `...`, // For webpack@5 extend existing minimizers
            ],
            runtimeChunk: isDev ? 'single' : undefined,
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: isDev ?
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
            isDev && new ReactRefreshPlugin(),
            isProd ? new CleanWebpackPlugin() : Function(),
            new HtmlWebpackPlugin({
                title: 'React-Bunny',
                filename: 'index.html',
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output both options are optional
                filename: isDev ? '[name].css' : '[name].[contenthash].css',
                chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
            }),
            // ForkTsChecker v8.0.0 utilizes TypeScript v4.5.5, which means that the checking rules may differ from those in your IDE. For instance, [const edge = edge as DirectedEdge;] does not generate an error in TypeScript v5.1.6, while ForkTsChecker displays an error message stating [Variable 'edge' is used before being assigned.].
            new ForkTsCheckerWebpackPlugin(), // TypeScript type checking in a separate process, improving build performance by parallelizing the type checking task, while ESLint checks for coding style, potential errors, and enforces best practices in your code. It can catch issues related to code formatting, naming conventions, unused variables, and more. ESLint also supports TypeScript-specific rules through plugins like eslint-plugin-typescript.
            new ESLintPlugin({
                extensions: ['js', 'jsx', 'ts', 'tsx'], // Specify the file extensions to lint
                eslintPath: require.resolve('eslint'), // Specify the path to the eslint module
                context: path.resolve(__dirname, 'src'), // Specify the directory to lint
                // Other ESLint options can be configured here
            }),
            new StylelintPlugin({
                files: ['src/**/*.{scss,sass}'],
            }),
        ],
        target: isDev ? 'web' : 'browserslist', //default being 'browserlist' since 5.0.0-rc.1,Set to "web" when developing with react-hot-loader
        watchOptions: {
            // for some systems, watching many files can result in a lot of CPU or memory usage
            // https://webpack.js.org/configuration/watch/#watchoptionsignored
            // don't use this pattern, if you have a monorepo with linked packages
            ignored: /node_modules/,
        }
    };
}

export default configFactory;
