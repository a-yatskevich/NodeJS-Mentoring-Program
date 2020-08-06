import { Transform } from 'stream';

class ReverseTransformer extends Transform {
  _transform(data, encoding, cb) {
    this.push(
      data
        .toString()
        .split('')
        .reverse()
        .concat('\n\n')
        .join('')
    );
    cb();
  }
}
 
const read = process.stdin;
const write = process.stdout;
const Transformer = new ReverseTransformer();

read.pipe(Transformer).pipe(write);


/** Second solution **/

// const readline = require('readline');

// const readlineStream = readline.createInterface({
//   input: process.stdin,
// });

// readlineStream.on('line', (input) => {
//   const reversedString = input.split('').reverse().join('');
//   console.log(reversedString, '\n');
// });
