const readline = require('readline');

const readlineStream = readline.createInterface({
  input: process.stdin,
});

readlineStream.on('line', (input) => {
  const reversedString = input.split('').reverse().join('');
  console.log(reversedString, '\n');
});
