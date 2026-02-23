import { env } from 'cloudflare:workers';

import type { EmitterWebhookEvent } from '@octokit/webhooks';

type Event = EmitterWebhookEvent<
  | 'pull_request'
  | 'pull_request_review'
>;

export const isValidPullRequester = (event: Event): boolean => {
  return event.payload.pull_request?.user?.login === env.RENOVATE_BOT_NAME;
};
