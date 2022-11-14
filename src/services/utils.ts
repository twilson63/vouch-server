import fs from 'fs'

const walletFile = process.env.NODE_ENV === 'production' ? '/etc/secrets/wallet.json' : './wallet.json'
const wallet = JSON.parse(fs.readFileSync(walletFile, 'utf-8'))


export const readWallet = () => wallet