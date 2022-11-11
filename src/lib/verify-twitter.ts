import { botCheck } from './botometer'

const BEARER = process.env.TWITTER_BEARER
const API = 'https://api.twitter.com/2/tweets/search/recent'
const API2 = 'https://api.twitter.com/2/users'

export default function search(addr: string, handle: string) {
  return fetch(API + `?query=${addr}&tweet.fields=author_id`, {
    headers: {
      Authorization: `Bearer ${BEARER}`
    }
  }).then(res => res.ok ? res.json() : res.text())
    .then((result) =>
      (result.data && result.data[0].text === `I am vouching for my wallet address ${addr}  🐘 via @vouchdao!`)
        ? result.data[0].author_id
        : Promise.reject(new Error('Could not find Tweet!'))
    )
    .then(author_id => fetch(API2 + `/${author_id}`, {
      headers: {
        Authorization: `Bearer ${BEARER}`
      }
    }))
    .then(res => res.ok ? res.json() : res.text())
    .then(({ data }) => botCheck(`@${data.username}`))
}