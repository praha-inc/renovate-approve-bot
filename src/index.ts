import { Webhooks, createWebMiddleware } from '@octokit/webhooks';
import { env } from 'cloudflare:workers';

import { approvePullRequest } from './helpers/approve-pull-request';
import { isEnableAutomerge } from './helpers/is-enable-automerge';
import { isValidPullRequester } from './helpers/is-valid-pull-requester';
import { isValidReviewer } from './helpers/is-valid-reviewer';
import { isValidSender } from './helpers/is-valid-sender';

const webhooks = new Webhooks({
  secret: env.WEBHOOK_SECRET,
});

webhooks.on('pull_request.opened', async (event) => {
  console.log(JSON.stringify(event));

  if (
    isEnableAutomerge(event)
    && isValidSender(event)
  ) {
    console.log('Approving pull request');
    await approvePullRequest(event);
  } else {
    console.log('Ignoring pull request');
  }
});

webhooks.on('pull_request_review.dismissed', async (event) => {
  console.log(JSON.stringify(event));

  if (
    isEnableAutomerge(event)
    && isValidSender(event)
    && isValidReviewer(event)
    && isValidPullRequester(event)
  ) {
    console.log('Re-approving pull request');
    await approvePullRequest(event);
  } else {
    console.log('Ignoring pull request');
  }
});

export default {
  fetch: (request: Request) => {
    return createWebMiddleware(webhooks, { path: '/webhooks' })(request);
  },
};
