import { describe, expect, it, vi } from 'vitest';

import { isValidPullRequester } from './is-valid-pull-requester';

vi.mock('cloudflare:workers', () => ({
  env: {
    RENOVATE_BOT_NAME: 'renovate[bot]',
  },
}));

describe('isValidPullRequester', () => {
  it('should return true if pull_request.user.login matches RENOVATE_BOT_NAME', () => {
    const event = {
      payload: {
        pull_request: {
          user: {
            login: 'renovate[bot]',
          },
        },
      },
    } as Parameters<typeof isValidPullRequester>[0];

    expect(isValidPullRequester(event)).toBe(true);
  });

  it('should return false if pull_request.user.login does not match RENOVATE_BOT_NAME', () => {
    const event = {
      payload: {
        pull_request: {
          user: {
            login: 'other-user',
          },
        },
      },
    } as Parameters<typeof isValidPullRequester>[0];

    expect(isValidPullRequester(event)).toBe(false);
  });
});
