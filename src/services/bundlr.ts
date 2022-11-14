import Bundlr from '@bundlr-network/client'
import { Async } from 'crocks'
import { path } from 'ramda'
import { readWallet } from './utils'

const wallet = readWallet()
const bundlr = new Bundlr('https://node2.bundlr.network', 'arweave', wallet)

export const dispatch = Async.fromPromise(async ({ service, address, type }) => {
  const tags = [
    { name: 'Content-Type', value: 'application/json' },
    { name: 'App-Name', value: 'Vouch' },
    { name: 'App-Version', value: '0.1' },
    { name: 'Verification-Method', value: service },
    { name: 'Vouch-For', value: address }
  ]
  const tx = bundlr.createTransaction(JSON.stringify({ service, address, type }), { tags })
  await tx.sign()

  const result = await tx.upload()
  return { ok: true, id: path(['data', 'id'], result) }
})
