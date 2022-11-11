import express from 'express'
import { Request, Response } from 'express'
import vouch from './lib/vouch'

const app = express()

app.post('/vouch', express.json(), async (req: Request, res: Response) => {
  res.send(await vouch(req.body))
})

app.get('/', (req: Request, res: Response) => {
  res.send("Welcome to the vouch-service, for more information go to https://vouchdao.xyz")
})

app.listen(3000)