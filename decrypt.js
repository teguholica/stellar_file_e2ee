const fs = require('fs')
const zlib = require('zlib')
const path = require('path')
const crypto = require('crypto')
const ed2curve = require('ed2curve')
const nacl = require('tweetnacl')
const StellarSdk = require('stellar-sdk')

// Public Key	GCYVWGJQRFJEUX6B3QD2IIS264HNGWVWAYK3UK2HZVH3JCAEMEQSPFGS
// Secret Key	SBRWQLBCM7YOFJLRTBQZEZNADKIX6CLREM4T4OUPXAQPZKRH425ITQ2B

// Public Key	GAQJG3V36VC647QYIERRRORRBBRIJPFWTAIRRGBMPJRFBG7UT43GW7Y7
// Secret Key	SAYLFKU4Z6LXBGZNFNCQZDKON656O7S6FQHX2DKLTUZMTQZIVC7YTSJQ

var keypairA = StellarSdk.Keypair.fromSecret('SAYLFKU4Z6LXBGZNFNCQZDKON656O7S6FQHX2DKLTUZMTQZIVC7YTSJQ')
var keypairB = StellarSdk.Keypair.fromPublicKey('GCYVWGJQRFJEUX6B3QD2IIS264HNGWVWAYK3UK2HZVH3JCAEMEQSPFGS')

const keypairCurveA = ed2curve.convertSecretKey(keypairA.rawSecretKey())
const keypairCurveB = ed2curve.convertPublicKey(keypairB.rawPublicKey())

const shared = nacl.box.before(keypairCurveB, keypairCurveA)

const file = './image_encrypt.jpg'
const readStream = fs.createReadStream(file)
const gzip = zlib.createUnzip()
const writeStream = fs.createWriteStream('./image_decrypt.jpg')

const encrypt = crypto.createDecipher('aes-256-ctr', Buffer.from(shared).toString('hex'))

readStream
    .pipe(encrypt)
    .pipe(gzip)
    .pipe(writeStream)