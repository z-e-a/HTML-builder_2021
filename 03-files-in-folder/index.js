const { debug } = require('console');
const fs = require('fs');
const path = require('path');

try {
    debugger
  const files =  fs.readdir(path.join(__dirname, 'secret-folder')
  ,{ withFileTypes: true },
  (err, files) => {
  console.log("\nCurrent directory files:");
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
        if (file.isFile()){
            console.log(file);
        }
    })
  }
});
//   for (const file of files)
//     console.log(file);
} catch (err) {
  console.error(err);
}