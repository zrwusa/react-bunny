module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      '@babel/preset-env',
      "@babel/preset-typescript",
      ['@babel/preset-react', {development: !api.env('production'), runtime: 'automatic'}], // Enable development transform of React with new automatic runtime
    ],
    ...(!api.env('production') && {plugins: ['react-refresh/babel']}), // Applies the react-refresh Babel plugin on non-production modes only
  };
}
