import type { Password, User } from '@prisma/client'

import { hashPassword, verifyPassword } from '~/utils/password.server'

import { DB } from './utils.server'

export type { User } from '@prisma/client'

export async function getUserById(id: User['id']) {
  return DB.user.findUnique({ where: { id } })
}

export async function getUserByEmail(email: User['email']) {
  return DB.user.findUnique({ where: { email } })
}

export async function createUser(email: User['email'], password: string) {
  const hashedPassword = await hashPassword(password)

  return DB.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })
}

export async function deleteUserByEmail(email: User['email']) {
  return DB.user.delete({ where: { email } })
}

export async function verifyLogin(
  email: User['email'],
  password: Password['hash'],
) {
  const userWithPassword = await DB.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  })

  if (!userWithPassword || !userWithPassword.password) {
    return null
  }

  const isValid = await verifyPassword(
    userWithPassword.password.hash,
    password,
  )

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}
