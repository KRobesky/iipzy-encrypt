// From: https://medium.com/@brandonstilson/lets-encrypt-files-with-node-85037bea8c0e
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

//const AppendInitVect = require('./appendInitVect');
//const getCipherKey = require('./getCipherKey');

const { Transform } = require('stream');

class AppendInitVect extends Transform {
  constructor(initVect, opts) {
    super(opts);
    this.initVect = initVect;
    this.appended = false;
  }

  _transform(chunk, encoding, cb) {
    if (!this.appended) {
      this.push(this.initVect);
      this.appended = true;
    }
    this.push(chunk);
    cb();
  }
}

function getCipherKey(password) {
    return crypto.createHash('sha256').update(password).digest();
  }

module.exports = AppendInitVect;

function encrypt({ inputFile, outputFile, password }) {
  // Generate a secure, pseudo random initialization vector.
  const initVect = crypto.randomBytes(16);
  
  // Generate a cipher key from the password.
  const CIPHER_KEY = getCipherKey(password);
  //console.log("key = " + CIPHER_KEY);
  //console.log("inputFile = " + inputFile);
  //console.log("password = " + password);
  //console.log("typeof inputFile = " + typeof inputFile);
  const readStream = fs.createReadStream(inputFile);
  const gzip = zlib.createGzip();
  const cipher = crypto.createCipheriv('aes256', CIPHER_KEY, initVect);
  const appendInitVect = new AppendInitVect(initVect);
  // Create a write stream with a different file extension.
  const writeStream = fs.createWriteStream(path.join(outputFile));
  
  readStream
//    .pipe(gzip)
    .pipe(cipher)
    .pipe(appendInitVect)
    .pipe(writeStream);
}

function decrypt({ inputFile, outputFile, password }) {
  // First, get the initialization vector from the inputFile.
  const readInitVect = fs.createReadStream(inputFile, { end: 15 });

  let initVect;
  readInitVect.on('data', (chunk) => {
    initVect = chunk;
  });

  // Once we’ve got the initialization vector, we can decrypt the inputFile.
  readInitVect.on('close', () => {
    const cipherKey = getCipherKey(password);
    const readStream = fs.createReadStream(inputFile, { start: 16 });
    const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect);
    const unzip = zlib.createUnzip();
    const writeStream = fs.createWriteStream(outputFile);

    readStream
      .pipe(decipher)
  //    .pipe(unzip)
      .pipe(writeStream);
  });
}

module.exports = { encrypt, decrypt };
