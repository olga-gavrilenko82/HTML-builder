const fs = require('fs');
const path = require('path');
const readline = require('readline');

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const pathFile = path.join(__dirname, 'text.txt');
const fileText = fs.createWriteStream(pathFile);

readline.emitKeypressEvents(process.stdin);

process.stdin.on('keypress', (_, key) => {
  if (key && key.ctrl && key.name === 'c') {
    console.log('\nВы вышли');
  }
})

function write() {
  readLine.question('Введите текст -', (text) => {
    console.log(text);
    if (text.toLocaleLowerCase() === 'exit') {
      console.log('\nВы вышли');
      readLine.close();
      return;
    }

    fileText.write(text + '\n', (err) => {
      if (err) {
        console.log(err.message);
      } else {
        write();
      }
    });
  });
}

write();
