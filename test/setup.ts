import test from 'ava'
import app from '../src/app'

const TEST_PORT = 3000

export function setup() {
  test.before('Start the server', () => {
    app.listen(TEST_PORT, () => console.log(`Test server running on ${TEST_PORT}`))
  })

  return test
}
