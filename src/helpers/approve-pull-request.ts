import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';
import { env } from 'cloudflare:workers';

import type { EmitterWebhookEvent } from '@octokit/webhooks';

type Event = EmitterWebhookEvent<
  | 'pull_request.opened'
  | 'pull_request_review.dismissed'
>;

export const approvePullRequest = async (event: Event): Promise<void> => {
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: env.RENOVATE_APPROVE_BOT_APP_ID,
      privateKey: env.RENOVATE_APPROVE_BOT_PRIVATE_KEY,
      installationId: event.payload.installation?.id,
    },
  });

  await octokit.pulls.createReview({
    event: 'APPROVE',
    owner: event.payload.repository.owner.login,
    repo: event.payload.repository.name,
    pull_number: event.payload.pull_request.number,
  });
};
