'use strict';

const assert = require('assert');
const probe = require('react-probe');
const GitHubButtonProto = require('../lib').prototype;

describe('GitHubButton', () => {
  it('should set `state.count` correctly', () => {
    const self = probe.instance({
      props: {
        type: 'stargazers',
      },
      state: {
        count: null,
      }
    });

    GitHubButtonProto.setCount.call(self, {
      'stargazers_count': 10,
    });
    assert.strictEqual(self.state.count, 10);
  });
});
