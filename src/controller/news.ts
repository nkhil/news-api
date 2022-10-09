import * as fs from 'fs'
import got from 'got'
import never from 'never'
import { cleanEnv, str } from 'envalid'
import * as dotenv from 'dotenv'

import type { TopStoriesResponse } from '../types/news'

dotenv.config()

const env = cleanEnv(process.env, {
  NEWS_API_KEY: str(),
  NEWS_SOURCES: str(),
})

const NEWS_API_KEY = env.NEWS_API_KEY ?? never('Missing NEWS_API_KEY environment variable')
const NEWS_SOURCES = env.NEWS_SOURCES ?? never('Missing NEWS_SOURCES environment variable')

const NEWS_API_ENDPOINT = 'https://newsapi.org/v2'

const gotExtended = got.extend({
  prefixUrl: NEWS_API_ENDPOINT,
  responseType: 'json',
  retry: {
    limit: 2,
    statusCodes: [403, 408, 429, 500, 502, 503, 504],
  },
})

function createHeaders(): { 'X-Api-Key': string } {
  return {
    'X-Api-Key': NEWS_API_KEY,
  }
}

export async function getTopHeadlines(): Promise<TopStoriesResponse> {
  try {
    const path = 'top-headlines'
    const headers = createHeaders()

    const { body } = await gotExtended.get<TopStoriesResponse>(path, { 
      headers,
      searchParams: {
        sources: NEWS_SOURCES, 
      }
    })
    return body
  } catch (error) {
    console.log('An error occurred!')
    console.log(JSON.stringify(error))
    throw error
  }
}

function defaultResponse(): TopStoriesResponse {
  return {
    status: 'OK',
    totalResults: 0,
    articles: [],
  } 
}

export function serveLocalData(): TopStoriesResponse {
  const fileExists = fs.existsSync('data.json')
  if (!fileExists) {
    return defaultResponse()
  }

  const data = fs.readFileSync('data.json').toString()
  return JSON.parse(data) as TopStoriesResponse
}
