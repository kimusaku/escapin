module.exports = {
  overrides: [
    {
      files: ['*.js', '*.ts'],
      options: {
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
      },
    },
  ],
};
