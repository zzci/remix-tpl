import { createRequestHandler } from '@remix-run/express'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'

const remixHandler = createRequestHandler({
  build: await import('../build/server/index.js'),
})

const app = express()

app.use(compression())

app.disable('x-powered-by')

app.use('/assets', express.static('build/client/assets', { immutable: true, maxAge: '1y' }))

app.use(express.static('build/client', { maxAge: '1h' }))

app.use(morgan('tiny'))

app.all('*', remixHandler)

const port = process.env.PORT || 3000
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Express server listening at http://localhost:${port}`))
