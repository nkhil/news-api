import { setup } from './setup'
// import app from '../src/app'

const test = setup()
const fn = () => 'foo';

test('fn() returns foo', t => {
	t.is(fn(), 'foo');
});

