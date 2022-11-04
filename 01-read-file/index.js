const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'text.txt');
const stream = new fs.createReadStream(pathFile);

stream.pipe(process.stdout);
