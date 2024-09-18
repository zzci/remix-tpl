import type { MetaFunction } from '@remix-run/node'
import { Button, Flex, Group } from '@mantine/core'

import { useOptionalUser } from '~/utils/clientUtils'

export const meta: MetaFunction = () => [{ title: 'Remix Notes' }]

export default function Index() {
  const user = useOptionalUser()
  return (
    <Flex justify="center" className="h-screen h-svh">
      {user
        ? (
            <Group>
              <Button component="a" href="/notes">
                View Notes for
                {' '}
                {user.email}
              </Button>
            </Group>
          )
        : (
            <Group>
              <Button component="a" href="/join">
                Sign up
              </Button>
              <Button component="a" href="/login" variant="light">
                Log In
              </Button>
            </Group>
          )}
    </Flex>
  )
}
