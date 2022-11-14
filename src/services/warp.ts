import { WarpFactory } from 'warp-contracts'
import { Async } from 'crocks'
import { path } from 'ramda'
import { readWallet } from './utils'


const warp = WarpFactory.forMainnet()
const VOUCH = '_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk'
const wallet = readWallet()

const contract = warp.contract(VOUCH).connect(wallet)

export const register = Async.fromPromise(({ address, transaction }) =>
  contract.writeInteraction({
    function: 'addVouchedUser',
    address,
    transaction
  })
    .then(() => contract.readState())
    .then(({ cachedValue }) => path(['state', 'vouched', address], cachedValue) ? true : false)
)