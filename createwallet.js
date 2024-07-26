//importing the depences
const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoin = require('bitcoinjs-lib')

//define network
//bitcoin - main network - mainnet
//testnet - test network - testnet
const network = bitcoin.networks.testnet

//wallets derivations HD
const path = "m/49'/1'/0'/0/0";

//creating mnemonic for the seed (password keys)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//creating a source wallet HD
let root = bip32.fromSeed(seed, network)

//creating account - pair PRIV Keys and PUB Keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Generated Wallet")
console.log("Address", btcAddress)
console.log("Private Key", node.toWIF())
console.log("Seed", mnemonic)