const fs = require('fs');
const readline = require('readline');

// Get the CSV file path and column name from command-line arguments
const [csvFilePath, columnName] = process.argv.slice(2);

let sum = 0;
let header = null;
let columnIndex = -1;

// Create a read stream from the CSV file
const readStream = fs.createReadStream(csvFilePath);

// Handle errors when opening the file
readStream.on('error', (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});

// Create a readline interface
const rl = readline.createInterface({
  input: readStream,
});

// Read each line from the CSV file
rl.on('line', (line) => {
  if (header === null) {
    header = line.split(',');
    columnIndex = header.indexOf(columnName);

    if (columnIndex === -1) {
      console.log(`The sum of ${columnName} is: 0`);
      process.exit(0);
    }
  } else {
    const row = line.split(',');
    sum += Number(row[columnIndex]);
  }
});

// Output the sum after reading the entire file
rl.on('close', () => {
  console.log(`The sum of ${columnName} is: ${sum}`);
});
