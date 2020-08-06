import path from 'path';
import { promisify } from 'util';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import csv from 'csvtojson';

const csvFilePath = path.resolve(__dirname, './csv/nodejs-hw1-ex1.csv');
const outputPath = path.resolve(__dirname, './output.txt');

const readStream = createReadStream(csvFilePath);
const writeStream = createWriteStream(outputPath);

const asyncPipeline = promisify(pipeline);

asyncPipeline(readStream, csv(), writeStream)
  .then(() => console.log('SUCCESS'))
  .catch((err) => console.log('ERROR:', err))

