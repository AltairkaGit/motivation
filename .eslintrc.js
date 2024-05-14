module.exports = {
    extends: ['@salutejs/eslint-config'],
    ignorePatterns: ['*.d.ts', 'coverage/*', 'build/*', 'src/*'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'semi': ['off'],
        'prettier/prettier': 0,
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@next/next/no-page-custom-font': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'object-curly-spacing': 'off',
    },
};
