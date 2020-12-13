import path from "path";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import autoprefixer from "autoprefixer";
import StylelintPlugin from "stylelint-webpack-plugin";

function configFactory() {
    const ext = {
        ts: /\.(ts|js)x?$/,
        js: /\.js$/,
        image: /\.(png|svg|jpg|jpeg|gif)$/i,
        sass: /\.s[ac]ss$/i,
    };
    const buildPath = "public";
    const devMode = process.env.NODE_ENV === "development";
    const prodMode = process.env.NODE_ENV === "production";

    const config: webpack.Configuration = {
        entry: "./src/index.tsx",
        mode: devMode ? "development" : prodMode ? "production" : "none",
        devtool: devMode ? "source-map" : false,
        devServer: devMode ? {
            contentBase: path.join(__dirname, buildPath),
            compress: false,
            port: 3006,
            hot: true,
            open: true, // "Google Chrome"
            historyApiFallback: true,
            proxy: {  // Front-end and back-end separation
                "/api": {
                    target: "http://localhost:8000",
                    pathRewrite: {"^/api": ""}
                }
            }
        } : {},
        module: {
            rules: [
                {
                    test: ext.image,
                    loader: "url-loader",
                    options: {
                        limit: 500,
                        name: "images/[name]_[hash:7].[ext]",
                    }
                },
                {
                    test: ext.ts,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
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
                            loader: "css-loader",
                            options: {
                                // modules: true,
                                sourceMap: devMode,
                                // importLoader: 1   // When using postCSS with nextCSS (no @import resolver) you'll want to set importLoaders. But when using sass, it already handles the @import statements.
                            }
                        },

                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [autoprefixer()],
                                },
                                sourceMap: devMode,
                            }
                        },

                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: devMode,
                            }
                        }
                    ]
                },

            ],
        },
        resolve: {
            modules: ["node_modules", "react"],
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
            alias: {"react-dom": "@hot-loader/react-dom"},
        },
        output: {
            path: path.resolve(__dirname, buildPath),
            filename: devMode ? "[name].js" : "[name].[chunkhash].js",
            publicPath: "/"
        },
        optimization: {
            minimize: prodMode,
            minimizer: [
                `...`, // For webpack@5 extend existing minimizers
            ],
            runtimeChunk: devMode ? "single" : undefined,
            splitChunks: devMode ? {
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module: any) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];                            // get the name node_modules/packageName
                            return `npm.${packageName.replace('@', '')}`;                            // npm package names are URL-safe, but some servers don't like @ symbols
                        },
                    },
                },
            } : {
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                    },
                },
            },
        },
        plugins: [
            prodMode ? new CleanWebpackPlugin() : function () {
            },
            new HtmlWebpackPlugin({
                title: "React-Bunny",
                filename: "index.html",
                template: "./src/index.html"
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output both options are optional
                filename: devMode ? "[name].css" : "[name].[contenthash].css",
                chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
            }),
            new ForkTsCheckerWebpackPlugin({
                async: false,
                eslint: {
                    files: "./src/**/*.{ts,tsx}",
                },
            }),
            new StylelintPlugin({
                context: "./src",
                files: ["**/*.{scss,sass}"]
            })
            // devMode?new webpack.HotModuleReplacementPlugin():function () {}
        ],
        target: devMode ? "web" : "browserslist", //default being 'browserlist' since 5.0.0-rc.1,Set to "web" when developing with react-hot-loader
    };
    return config;
}

export default configFactory;
