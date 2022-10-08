import express from 'express'
import helmet from 'helmet'

const app = express()

app.use(helmet())

app.get('/', async (req, res) => {
  const response = await Promise.resolve({ hello: 'world' })
  res.json(response)
})

export default app
