import { env } from 'cloudflare:workers';

import type { EmitterWebhookEvent } from '@octokit/webhooks';

type Event = EmitterWebhookEvent;

export const isValidSender = (event: Event): boolean => {
  return event.payload.sender?.login === env.RENOVATE_BOT_NAME;
};
