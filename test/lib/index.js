import test from 'tape';

import task from '../../lib/';

test('export', t => {
    t.equal(
        typeof task,
        'function',
        'must be a function'
    );

    t.end();
});
