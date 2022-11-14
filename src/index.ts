import express from 'express'
import { Request, Response } from 'express'
import * as services from './services/index'
import vouch from './lib/vouch'

const app = express()

app.post('/vouch', express.json(), async (req: Request, res: Response) => {
  try {
    res.send(await vouch(req.body).runWith(services).toPromise())
  } catch (e) {
    res.status(500).send({ ok: false, error: e.message })
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send("Welcome to the vouch-service, for more information go to https://vouchdao.xyz")
})

app.listen(3000)