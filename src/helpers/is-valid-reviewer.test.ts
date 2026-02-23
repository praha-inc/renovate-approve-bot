import { describe, expect, it, vi } from 'vitest';

import { isValidReviewer } from './is-valid-reviewer';

vi.mock('cloudflare:workers', () => ({
  env: {
    RENOVATE_APPROVE_BOT_NAME: 'renovate-approve[bot]',
  },
}));

describe('isValidReviewer', () => {
  it('should return true if review.user.login matches RENOVATE_APPROVE_BOT_NAME', () => {
    const event = {
      payload: {
        review: {
          user: {
            login: 'renovate-approve[bot]',
          },
        },
      },
    } as Parameters<typeof isValidReviewer>[0];

    expect(isValidReviewer(event)).toBe(true);
  });

  it('should return false if review.user.login does not match RENOVATE_APPROVE_BOT_NAME', () => {
    const event = {
      payload: {
        review: {
          user: {
            login: 'other-user',
          },
        },
      },
    } as Parameters<typeof isValidReviewer>[0];

    expect(isValidReviewer(event)).toBe(false);
  });
});
