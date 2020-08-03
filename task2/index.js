const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const csv = require('csvtojson');

const csvFilePath = path.join(__dirname, './csv/nodejs-hw1-ex1.csv');
const outputPath = path.join(__dirname, './output.txt');

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(outputPath);

pipeline(
  readStream,
  csv(),
  writeStream,
  (err, res) => {
    if (err) {
      console.log('ERROR:', err);
      return;
    }
    console.log('SUCCESS');
  }
);
