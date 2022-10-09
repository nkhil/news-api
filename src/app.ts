import express from 'express'
import helmet from 'helmet'

import * as news from './controller/news'

const app = express()

app.use(helmet())

app.get('/', (_, res) => {
  const response = news.serveLocalData()
  res.json(response)
})

export default app
