import * as fs from 'fs'

import app from './app'
import { cleanEnv, num } from 'envalid'
import { getTopHeadlines } from './controller/news'

const env = cleanEnv(process.env, {
  PORT: num(),
})

const PORT = env.PORT ?? 3000

app.listen(PORT, () => {
  console.log('App listening...')
})

const TEN_MINUTES = 10 * (1000 * 60) // 60 seconds x 10 = 10 minutes

// Immediately fetch data
setImmediate(async () => {
  const data = await getTopHeadlines()
  fs.writeFileSync('data.json', Buffer.from(JSON.stringify(data)))
})

// Fetch new data every 10 minutes
setInterval(async () => {
  const data = await getTopHeadlines()
  fs.writeFileSync('data.json', Buffer.from(JSON.stringify(data)))
}, TEN_MINUTES)
