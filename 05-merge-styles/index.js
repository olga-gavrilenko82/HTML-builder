const path = require('path');
const fs = require('fs');
const { stdout } = process;
const { readdir, writeFile, stat } = require('fs/promises');


const sourcePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist');

async function bundleFile(source, bundle) {
  try {
    const files = await readdir(source, { withFileTypes: true });
    const data = [];
    for (const file of files) {
      const extFile = path.extname(path.join(source, file.name));
      if (file.isFile() && extFile === '.css') {
        const size = await stat(path.join(source, file.name));
        const input = fs.createReadStream(path.join(source, file.name), { highWaterMark: size.size }, 'utf-8');
        for await (const chunk of input) {
          data.push(chunk);
        }
      }
    }
    await writeFile(path.join(bundle, 'bundle.css'), data.join('\n'), 'utf8');
  } catch (err) {
    stdout.write(`\nError: ${err.message}\n`);
  }
}

bundleFile(sourcePath, bundlePath);