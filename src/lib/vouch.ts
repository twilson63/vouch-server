import Arweave from 'arweave'
import { WarpFactory } from 'warp-contracts'
import verifyTwitter from './verify-twitter'
import verifyDiscord from './verify-discord'

import { z } from 'zod'

const VouchRequest = z.object({
  address: z.string(),
  service: z.string(),
  handle: z.string(),
  type: z.string()
})

type VouchRequest = z.infer<typeof VouchRequest>

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
})

const warp = WarpFactory.forMainnet()

export default function (payload: VouchRequest) {
  return Promise.resolve(payload)
    .then(VouchRequest.parseAsync)
    .then(data => {
      if (data.service === 'twitter') {
        return verifyTwitter(data.address, data.handle)
          .then((result: boolean) => result ? data : Promise.reject(result))
      } else if (data.service === 'discord') {
        return verifyDiscord(data.address, data.handle)
          .then((result: boolean) => result ? data : Promise.reject(result))
      }
    })
    .then(dispatch(arweave))
    .then(post(warp))
}