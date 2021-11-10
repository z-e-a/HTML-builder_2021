// const { debug } = require('console');
const { log } = require('console');
const fs = require('fs');
const path = require('path');

try {
    // debugger
  const files =  fs.readdir(path.join(__dirname, 'secret-folder')
  ,{ withFileTypes: true },
  (err, files) => {
  // console.log("\nCurrent directory files:");
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
        if (file.isFile()){
          // console.log(file.name);          
          fs.stat(path.join(__dirname, 'secret-folder',file.name), (err, fileStats)=>{
            // debugger
            if (err) {
              console.error(err)
              return
            }            
            // console.log(file.name.split('.')[0] + ' - ' + fileStats.size);
            // console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]}  - ${fileStats.size / 1024}kb`);
            // console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]}  - ${fileStats.size} bytes`);
            console.log(`${path.parse(file.name).name} - ${path.parse(file.name).ext.replace(/^./, '')} - ${fileStats.size} bytes`);
          });
        }
    })
  }
});
//   for (const file of files)
//     console.log(file);
} catch (err) {
  console.error(err);
}