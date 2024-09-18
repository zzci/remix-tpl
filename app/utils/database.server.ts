/* eslint-disable  ts/no-explicit-any */
import { createClient } from '@libsql/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'

import { singleton } from '~/utils/singleton.server'

import logger from './logger.server'

class dbConnect {
  public db: PrismaClient

  constructor(env: any) {
    this.db = this.init(env)
  }

  init(env: any) {
    logger.info('dbConnect init')
    const logThreshold = 20
    let adapter

    if (process.env.DB_TYPE === 'd1') {
      adapter = new PrismaD1(env.DB)
    }
    else {
      const {
        LIBSQL_URL = 'file:prisma/dev.db',
        LIBSQL_AUTH_TOKEN = undefined,
      } = process.env

      const libsql = createClient({
        url: LIBSQL_URL,
        authToken: LIBSQL_AUTH_TOKEN,
      })
      adapter = new PrismaLibSQL(libsql)
    }

    const client = new PrismaClient({
      adapter,
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
      ],
    })
    client.$on('query', async (e: any) => {
      if (e.duration < logThreshold)
        return
      const dur = `${e.duration}ms`
      logger.info(`prisma:query - ${dur} - ${e.query}`)
    })
    void client.$connect()
    return client
  }
}

export function prisma(env?: any) {
  return singleton(dbConnect, env).db
}
