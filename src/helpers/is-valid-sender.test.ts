import { describe, expect, it, vi } from 'vitest';

import { isValidSender } from './is-valid-sender';

vi.mock('cloudflare:workers', () => ({
  env: {
    RENOVATE_BOT_NAME: 'renovate[bot]',
  },
}));

describe('isValidSender', () => {
  it('should return true if sender.login matches RENOVATE_BOT_NAME', () => {
    const event = {
      payload: {
        sender: {
          login: 'renovate[bot]',
        },
      },
    } as Parameters<typeof isValidSender>[0];

    expect(isValidSender(event)).toBe(true);
  });

  it('should return false if sender.login does not match RENOVATE_BOT_NAME', () => {
    const event = {
      payload: {
        sender: {
          login: 'other-user',
        },
      },
    } as Parameters<typeof isValidSender>[0];

    expect(isValidSender(event)).toBe(false);
  });
});
