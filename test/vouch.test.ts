import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { Async } from 'crocks'
import vouch from '../src/lib/vouch'

const services = {
  verify: Async.fromPromise((data) => Promise.resolve(data)),
  dispatch: Async.fromPromise(() => Promise.resolve({ ok: true, id: 1 })),
  register: Async.fromPromise(() => Promise.resolve(true))
}

test('vouch user', async () => {
  const result = await vouch({ address: '4321', service: 'discord', handle: 'xuser', type: 'vouch' })
    .runWith(services).toPromise()
  assert.equal(result, true)
})

test.run()