// import * as readline from 'node:readline';
// const readline = require('node:readline');
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const process = require("process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  if (line === "exit") {
    rl.close();
  } else {
    //  console.log ("Вы ввели:", line);
    fs.appendFile(path.join(__dirname, 'text.txt'), line + '\n', function (error) {
      if (error) throw error; // если возникла ошибка

      // console.log("Запись файла завершена. Содержимое файла:");
      // let data = fs.readFileSync("hello.txt", "utf8");
      // console.log(data); // выводим считанные данные
    });
  }
});

// rl.on('close', () => {
//      console.log ("Операция чтения линейных данных была прекращена");
// });

process.on("beforeExit", (code) => {
  // console.log('Process beforeExit event with code: ', code);
  console.log("Работа завершена! Досвидания...");
});

console.log("Введите текст:");
