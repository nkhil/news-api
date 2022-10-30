import app from './app'
import * as fs from 'fs'

import { getTopHeadlines } from './controller/news'

app.listen(3000, () => {
  console.log('App listening...')
})

const TEN_MINUTES = 10 * (1000 * 60) // 60 seconds x 10 = 10 minutes

setInterval(async () => {
  console.log('timeout beyond time')
  const data = await getTopHeadlines()
  fs.writeFileSync('data.json', Buffer.from(JSON.stringify(data)))
}, TEN_MINUTES)
