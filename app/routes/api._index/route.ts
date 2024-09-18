import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  const ip = request.headers.get('x-forwarded-for')

  return json(
    {
      routers: 'api',
      url: request.url,
      ip,
    },
    200,
  )
}
