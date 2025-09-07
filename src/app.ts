import express from 'express'
import { Request, Response } from 'express'
import webRouter from './router/api'
const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
webRouter(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
