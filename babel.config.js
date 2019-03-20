module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-typescript'],
    env: {
        production: {
            presets: ['minify']
      }
    }
};