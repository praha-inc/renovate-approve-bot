import { describe, expect, it } from 'vitest';

import { isEnableAutomerge } from './is-enable-automerge';

describe('isEnableAutomerge', () => {
  it('should return true when PR body contains "**Automerge**: Enabled"', () => {
    const event = {
      payload: {
        pull_request: {
          body: 'This is a test PR\n\n**Automerge**: Enabled\n\nSome other text',
        },
      },
    } as Parameters<typeof isEnableAutomerge>[0];

    expect(isEnableAutomerge(event)).toBe(true);
  });

  it('should return false when PR body does not contain "**Automerge**: Enabled"', () => {
    const event = {
      payload: {
        pull_request: {
          body: 'This is a test PR\n\nSome other text',
        },
      },
    } as Parameters<typeof isEnableAutomerge>[0];

    expect(isEnableAutomerge(event)).toBe(false);
  });
});
