const fs = require('fs');
const path = require('path');
// const readable = fs.createReadStream("./test1.txt");
const output = fs.createWriteStream(path.join(__dirname, 'project-dist','bundle.css'));

// readable.pipe(writeable);

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    // console.log("\nCurrent directory files:");
    if (err) console.log(err);
    else {
    //   files.forEach((file) => {
    //     if (file.isFile() && path.extname(file.name).toLowerCase() === '.css') {
    //     //   console.log(file.name);
    //     debugger
    //         // fs.createReadStream(path.join(__dirname, 'styles', file.name)).pipe(output, { end: false });

    //     }
    //   });
    //   output.close();
// debugger
    streamMergeRecursive(files.filter( (file) =>  file.isFile() && path.extname(file.name).toLowerCase() === '.css'), output);

    }
  }
);


function streamMergeRecursive(files=[], fileWriteStream) {
    // Рекурсивно к оценке хвостовой ситуации
 if (!files.length) {
    return fileWriteStream.end();
        // return fileWriteStream.end ("console.log ('Слияние потока завершено')"); // Наконец, закрываем доступный для записи поток, чтобы предотвратить утечку памяти
 }

    const currentFile = path.resolve(__dirname, 'styles', files.shift().name);
    const currentReadStream = fs.createReadStream (currentFile); // Получить текущий читаемый поток

 currentReadStream.pipe(fileWriteStream, { end: false }); 
 currentReadStream.on('end', function() {
   streamMergeRecursive(files, fileWriteStream);
 });

    currentReadStream.on ('error', function (error) {// прослушивать события ошибок, закрывать доступный для записи поток и предотвращать утечки памяти
   console.error(error);
   fileWriteStream.close();
 });
}