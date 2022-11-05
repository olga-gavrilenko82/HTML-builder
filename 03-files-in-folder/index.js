
const path = require('path');
const { readdir, stat } = require('fs/promises');

const getBaseName = (pathFile, ext) => {
    return path.basename(pathFile, ext);
};

const getExtension = (pathFile) => {
    const extention = path.extname(pathFile);
    return extention.slice(1);
};

const getSize = (fileStats) => {
    return fileStats.size;
};

const readDirectory = async () => {
    const pathFolder = path.join(__dirname, 'secret-folder');

    try {
        const folderContent = await readdir(pathFolder);

        folderContent.forEach(async (file) => {
            const pathFile = path.join(pathFolder, file);

            const fileStats = await stat(pathFile);

            if(fileStats.isFile()) {
                const ext = path.extname(pathFile);

                const baseName = getBaseName(pathFile, ext);
                const extension = getExtension(pathFile);
                const fileSize = getSize(fileStats);

                const output = `${baseName} - ${extension} -  ${fileSize}b`;
                console.log(output);
            }
        });
    } catch (err) {
        if (err) console.error(err.message);
    }
};
readDirectory();