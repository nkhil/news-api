import cron from 'node-cron'
import * as fs from 'fs'

import { getTopHeadlines } from '../controller/news'

console.log('fetch news module loaded')

const TEN_MINUTES = '*/10 * * * *' 

cron.schedule(TEN_MINUTES, async () => {
  const data = await getTopHeadlines()
  fs.writeFileSync('data.json', Buffer.from(JSON.stringify(data)))
})
