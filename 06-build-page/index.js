const fs = require("fs");
const path = require("path");

fs.mkdir(
  path.join(__dirname, "project-dist"),
  { recursive: false },
  function () {}
);
/////////////////////////////////////////

// const htmlBundle = fs.createWriteStream(
//     path.join(__dirname, "project-dist", "index.html")
// );


const templateStream = new fs.ReadStream(path.join(__dirname, 'template.html'));


templateStream.on('readable', async function(){
  const data = templateStream.read();
  if(data != null)
  fs.writeFile(path.join(__dirname, "project-dist", "index.html"), data.toString(), function (error) {
    if (error) throw error; // если возникла ошибка
  });

/*   const data = templateStream.read();   
    if(data != null) {
        // console.log(data.toString()); //.replace(/\n/g, ''));
        fs.readdir(
            path.join(__dirname, "components"),
            { withFileTypes: true },
            (err, files) => {
            if (err) console.log(err);
            else {
                files.filter(
                    (file) =>
                    file.isFile() && path.extname(file.name).toLowerCase() === ".html"
                ).forEach((file) => {
                    // `{{${path.parse(filePath).name}}}
                    try{
                        let componentData = await fs.readFile(path.join(__dirname, "components", file.name))
                        data.toString().replace(`{{${path.parse(filePath).name}}}`, componentData.toString());
                    } catch (err){
                        console.log(err);
                    }
                })
                }
            }
        );

    }
 */    
});

/////////////////////////////////////////
const stylesBundle = fs.createWriteStream(
  path.join(__dirname, "project-dist", "style.css")
);

fs.readdir(
  path.join(__dirname, "styles"),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      streamMergeRecursive(
        files.filter(
          (file) =>
            file.isFile() && path.extname(file.name).toLowerCase() === ".css"
        ),
        stylesBundle
      );
    }
  }
);

function streamMergeRecursive(files = [], fileWriteStream) {
  if (!files.length) {
    return fileWriteStream.end();
  }

  const currentFile = path.resolve(__dirname, "styles", files.shift().name);
  const currentReadStream = fs.createReadStream(currentFile);

  currentReadStream.pipe(fileWriteStream, { end: false });
  currentReadStream.on("end", function () {
    streamMergeRecursive(files, fileWriteStream);
  });

  currentReadStream.on("error", function (error) {
    console.error(error);
    fileWriteStream.close();
  });
}

/////////////////////////////////////////

fs.mkdir(
  path.join(__dirname, "project-dist", "assets"),
  { recursive: false },
  function () {}
);

const files = fs.readdir(
  path.join(__dirname, "assets"),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (file.isFile()) {
          fs.copyFile(
            path.join(__dirname, "assets", file.name),
            path.join(__dirname, "project-dist", "assets", file.name),
            (err) => {
              if (err) {
                // console.log("Error Found:", err);
                console.error(err);
              }
            }
          );
        }
      });
    }
  }
);
