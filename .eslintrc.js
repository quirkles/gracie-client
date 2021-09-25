module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'ignorePatterns': ['**/*.html', '**/*.graphql', '**/*.gql'],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'max-len': [2, 120],
    'new-cap': ['error', {'capIsNew': false}],
    'require-jsdoc': ['error', {
      'require': {
        'FunctionDeclaration': false,
        'MethodDefinition': false,
        'ClassDeclaration': false,
        'ArrowFunctionExpression': false,
        'FunctionExpression': false,
      },
    }],
  },
};
