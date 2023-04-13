
const express = require('express');

const { encrypt, decrypt } = require("./encrypt_decrypt");

console.log("Encryption/Decryption");
console.log("length = " + process.argv.length);
if (process.argv.length < 3) {
    console.log("Usage: ");
    console.log("  -e -in <input file> -out <encrypted output file> -p <password>");
    console.log("  -d -in <encrypted input file> -out <output file> -p <password>");
    return;
}

const MODE_NULL = 0;
const MODE_ENCRYPT = 1;
const MODE_DECRYPT = 2;

let mode = MODE_NULL;
let inputFile = "";
let outputFile = "";
let password = "";

let inputFileNext = false;
let outputFileNext = false;
let passwordNext = false;
for (let i = 0; i < process.argv.length; i++) {
    //console.log("arg["+i+"]: " + process.argv[i]);
    if (inputFileNext) {
        inputFile = process.argv[i];
        inputFileNext = false;
    } if (outputFileNext) {
        outputFile = process.argv[i];
        outputFileNext = false;
    } if (passwordNext) {
        password = process.argv[i];
        passwordNext = false;
    } else if (process.argv[i] === "-e") {
        if (mode !== MODE_NULL) {
            console.log("(Error) invalid option");
            break;
        }
        mode = MODE_ENCRYPT;
    } else if (process.argv[i] === "-d") {
        if (mode !== MODE_NULL) {
            console.log("(Error) invalid option");
            break;
        }
        mode = MODE_DECRYPT;
    } else if (process.argv[i] === "-in") {
        inputFileNext = true;
    } else if (process.argv[i] === "-out") {
        outputFileNext = true;
    } else if (process.argv[i] === "-p") {
        passwordNext = true;
    }
}

if (mode === MODE_NULL) {
    console.log("(Error) -e or -d must be specified");
    return;
}

if (inputFile === "") {
    console.log("(Error) -in <inputfile> must be specified");
    return;
}

if (outputFile === "") {
    console.log("(Error) -out <outputfile> must be specified");
    return;
}

if (password === "") {
    console.log("(Error) -p <password> must be specified");
    return;
}

console.log("Parameters:");
console.log("  " + mode === MODE_ENCRYPT ? "encrypting":"decrypting");
console.log("  input: " + inputFile);
console.log("  output: " + outputFile);
console.log("  password: " + password);

try {
    if (mode === MODE_ENCRYPT) {
        encrypt({ inputFile, outputFile, password});
    } else {
        decrypt({ inputFile, outputFile, password}); 
    }
} catch (ex) {
    console.log("(Exception): " + ex);
    console.log(ex.stack);
}

return;