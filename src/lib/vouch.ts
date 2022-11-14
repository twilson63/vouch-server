import { Async, ReaderT } from 'crocks'
import { z } from 'zod'

const VouchData = z.object({
  address: z.string(),
  service: z.string(),
  handle: z.string(),
  type: z.string()
})

type VouchData = z.infer<typeof VouchData>

const { of, ask, lift } = ReaderT(Async)
const validate = Async.fromPromise(VouchData.parseAsync.bind(VouchData))

export default function (data: VouchData) {
  return of(data)
    .chain((data: VouchData) =>
      ask(({ verify, dispatch, register }) =>
        validate(data)
          .chain(verify)
          .chain(dispatch)
          .chain(register)
      )
        .chain(lift)
    )
}