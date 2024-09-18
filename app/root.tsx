import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import mantine from '@mantine/core/styles.css?url'
import { json } from '@remix-run/node'

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { getUser } from '~/utils/session.server'
import favicon from './images/favicon.ico?url'
import tailwind from './styles/tailwind.css?url'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: mantine },
    { rel: 'icon', href: favicon },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ user: await getUser(request) })
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body className="h-screen h-svh">
        <MantineProvider>{children}</MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
