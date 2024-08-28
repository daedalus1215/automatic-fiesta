module.exports = {
    // Other ESLint settings
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@components', './src/components'],
            ['@pages', './src/pages']
          ],
          extensions: ['.ts', '.js', '.jsx', '.tsx', '.vue']
        }
      }
    }
  };
  