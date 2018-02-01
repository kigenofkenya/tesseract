const assert = require('assert');
const app = require('../../src-server-feathers/app');

describe('\'messages\' service', () => {
  it('registered the service', () => {
    const service = app.service('messages');

    assert.ok(service, 'Registered the service');
  });
});
