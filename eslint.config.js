import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  ignores: ['prisma', '.github'],
  rules: {
    'node/prefer-global/process': 'off',
    'ts/no-explicit-any': 'error',
  },
})
