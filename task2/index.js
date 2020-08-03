import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import csv from 'csvtojson';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(__dirname, './csv/nodejs-hw1-ex1.csv');
const outputPath = path.join(__dirname, './output.txt');

const readStream = createReadStream(csvFilePath);
const writeStream = createWriteStream(outputPath);

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
