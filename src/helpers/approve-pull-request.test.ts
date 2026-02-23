import { describe, expect, it, vi } from 'vitest';

import { approvePullRequest } from './approve-pull-request';

const mockCreateReview = vi.hoisted(() => vi.fn());

vi.mock('../octokit', () => ({
  octokit: {
    pulls: {
      createReview: mockCreateReview,
    },
  },
}));

describe('approvePullRequest', () => {
  it('should call octokit.pulls.createReview with correct parameters', async () => {
    const event = {
      payload: {
        repository: {
          owner: {
            login: 'test-owner',
          },
          name: 'test-repo',
        },
        pull_request: {
          number: 123,
        },
      },
    } as Parameters<typeof approvePullRequest>[0];

    mockCreateReview.mockResolvedValue({});

    await approvePullRequest(event);

    expect(mockCreateReview).toHaveBeenCalledWith({
      owner: 'test-owner',
      repo: 'test-repo',
      pull_number: 123,
    });
    expect(mockCreateReview).toHaveBeenCalledTimes(1);
  });
});
