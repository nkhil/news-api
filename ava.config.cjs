
module.exports = () => ({
  files: ['test/*.test.ts'],
  ignoredByWatcher: ['.c8_output', 'coverage'],
  timeout: '30s',
  typescript: {
    rewritePaths: {
      'src/': 'build/',
    },
    compile: false,
  },
  environmentVariables: {
    TZ: 'UTC',
  },
  nodeArguments: [
    '--experimental-specifier-resolution=node',
    '--loader=ts-node/esm'
  ]
})
