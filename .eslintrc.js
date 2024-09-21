module.exports = {
  // Other ESLint settings
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@components', './src/shared/components'],
          ['@shared', './src/shared'],
          ['@utils', './src/shared/utils'],
          ['@pages', './src/pages'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.vue'],
      },
    },
  },
};
