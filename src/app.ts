import express, { Request, Response } from 'express'
import webRouter from './router/api'
import cors from 'cors';

const app = express()
const port = 8080

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

webRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
