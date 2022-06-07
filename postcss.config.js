module.exports = {
  plugins: ['postcss-preset-env'],
  options: {
    postcssOptions: {
      plugins: function () {
        return [require('autoprefixer')];
      },
    },
  },
};
