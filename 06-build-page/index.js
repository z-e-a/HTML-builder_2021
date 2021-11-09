const { debug } = require("console");
const fs = require("fs");
const path = require("path");


if (path.resolve(__dirname, "project-dist")){

};

fs.mkdir(
  path.join(__dirname, "project-dist"),
  { recursive: false },
  function () {}
);
/////////////////////////////////////////

const templateStream = new fs.ReadStream(path.join(__dirname, "template.html"));

var dataText = "";

templateStream.on("readable", function () {
  const data = templateStream.read();
  if (data != null)
    fs.writeFile(
      path.join(__dirname, "project-dist", "index.html"),
      data.toString(),
      function (error) {
        if (error) throw error; // если возникла ошибка
      }
    );

  if (data != null) {
    dataText = data.toString();

    fs.readdir(
      path.join(__dirname, "components"),
      { withFileTypes: true },
      (err, files) => {
        if (err) console.log(err);
        else {
          // debugger;
          doBundleHtmlRecursive(
            files.filter(
              (file) =>
                file.isFile() &&
                path.extname(file.name).toLowerCase() === ".html"
            ),
            dataText
          );
        }
      }
    );
  }
});

function doBundleHtmlRecursive(files = [], dataText) {
  if (!files.length) {
    return fs.writeFile(
      path.join(__dirname, "project-dist", "index.html"),
      dataText,
      function (error) {
        if (error) throw error; // если возникла ошибка
      }
    );
  } else {
  fileName = files.shift().name;
  fs.readFile(
    path.join(__dirname, "components", fileName),
    (err, componentData) => {
      if (err) console.log(err);
      else
        dataText = dataText.replace(
          `{{${path.parse(fileName).name}}}`,
          componentData.toString()
        );
      doBundleHtmlRecursive(files, dataText);
    }
  );
  }
}

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
    fileWriteStream.end();
  } else {
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
}

/////////////////////////////////////////

function copyDirRecursive(sourceDir, destDir){
  fs.mkdir(
    destDir,
    { recursive: false },
    (err) => {
      if (err) {
        return console.error(err);
      } else {
        fs.readdir(
          path.join(sourceDir),
          { withFileTypes: true },
          (err, files) => {
            if (err) console.log(err);
            else {
              files.forEach((file) => {
                if (file.isFile()) {
                  fs.copyFile(
                    path.join(sourceDir, file.name),
                    path.join(destDir, file.name),
                    (err) => {
                      if (err) {
                        console.error(err);
                      }
                    }
                  );
                  return;
                } else if (file.isDirectory()) {
                  debugger
                  copyDirRecursive(path.join(sourceDir, file.name), path.join(destDir, file.name));
                }
              });
            }
          }
        );
      }
    }
  )  
}

copyDirRecursive(path.join(__dirname, "assets"), path.join(__dirname, "project-dist", "assets")); 