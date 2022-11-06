const fs = require('fs');
const path = require('path');

function copyDir() {
  const pathFiles = path.join(__dirname, 'files');
  const pathCopyFiles = path.join(__dirname, 'files-copy');
  
  fs.promises.rm(pathCopyFiles,{ recursive: true, force: true }).then(() => fs.promises.mkdir(pathCopyFiles, {recursive: true})).then(() => {
    
    const options = {withFileTypes: true};
    const files = fs.promises.readdir(pathFiles, options);
    
    files.then((files) => {
      for (const file of files) {
        if (file.isFile()) {
          const originalFiles = path.join(pathFiles, file.name);
          const copyFiles = path.join(pathCopyFiles, file.name);
          fs.promises.copyFile(originalFiles, copyFiles);
        }
      }
    });
  });
}

copyDir();

