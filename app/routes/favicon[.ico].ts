import type { LoaderFunctionArgs } from '@remix-run/node'
import logger from '~/utils/logger.server'

export async function loader(ctx: LoaderFunctionArgs) {
  logger.info(ctx)
  return new Response('')
}
