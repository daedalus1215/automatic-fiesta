module.exports = {
    // Other ESLint settings
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@components', './src/components'],
            // Add other aliases as needed
          ],
          extensions: ['.ts', '.js', '.jsx', '.tsx', '.vue']
        }
      }
    }
  };
  