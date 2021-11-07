const fs = require('fs');
const path = require('path');
// debugger
fs.mkdir(path.join(__dirname, 'files-copy'),{recursive: false},function(){});

const files =  fs.readdir(path.join(__dirname, 'files')
  ,{ withFileTypes: true },
  (err, files) => {
  // console.log("\nCurrent directory files:");
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
        if (file.isFile()){
            console.log(file.name, ' copied!');
            fs.copyFile(path.join(__dirname,'files',file.name),path.join(__dirname,'files-copy',file.name),(err) => {
                if (err) {
                  console.log("Error Found:", err);
                }
            });
        }
    });
  }
});