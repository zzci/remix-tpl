import { createRequestHandler, type ServerBuild } from '@remix-run/cloudflare'

import * as build from '../build/server'

// eslint-disable-next-line ts/no-explicit-any
const handleRemixRequest = createRequestHandler(build as any as ServerBuild)

export default {
  // eslint-disable-next-line ts/no-explicit-any
  async fetch(request: any, env: any, ctx: any) {
    const waitUntil = ctx.waitUntil.bind(ctx)
    const passThroughOnException = ctx.passThroughOnException.bind(ctx)

    try {
      const loadContext = {
        cloudflare: {
          cf: request.cf,
          ctx: { waitUntil, passThroughOnException },
          caches,
          env,
        },
      }
      return await handleRemixRequest(request, loadContext)
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return new Response('An unexpected error occurred', { status: 500 })
    }
  },
}
