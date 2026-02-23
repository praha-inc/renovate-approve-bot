import type { EmitterWebhookEvent } from '@octokit/webhooks';

type Event = EmitterWebhookEvent<
  | 'pull_request'
  | 'pull_request_review'
>;

export const isEnableAutomerge = (event: Event): boolean => {
  return event.payload.pull_request.body?.includes('**Automerge**: Enabled') ?? false;
};
