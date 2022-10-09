export type NewsArticle = {
  title: string
  author: string
  source: {
    Id: string | null
    Name: 'string'
  }
  publishedAt: string
  url: string
}

export type NewsArticles = Array<NewsArticle>

export type TopStoriesResponse = {
  status: string
  totalResults: number
  articles: NewsArticles
}
