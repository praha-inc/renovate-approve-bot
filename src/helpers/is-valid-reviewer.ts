import { env } from 'cloudflare:workers';

import type { EmitterWebhookEvent } from '@octokit/webhooks';

type Event = EmitterWebhookEvent<
  | 'pull_request_review'
>;

export const isValidReviewer = (event: Event): boolean => {
  return event.payload.review.user?.login === env.RENOVATE_APPROVE_BOT_NAME;
};
