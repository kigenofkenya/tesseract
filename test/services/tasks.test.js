const assert = require('assert');
const app = require('../../src-server-feathers/app');

describe('\'tasks\' service', () => {
  it('registered the service', () => {
    const service = app.service('tasks');

    assert.ok(service, 'Registered the service');
  });
});
