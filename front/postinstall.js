// import fse from 'fs-extra';
// import path from 'path';
// const topDir = import.meta.dirname;
// fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
// fse.copySync(path.join(topDir, 'node_modules', 'tinymce'), path.join(topDir, 'public', 'tinymce'), { overwrite: true });

import fse from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fse.emptyDirSync(path.join(__dirname, 'public', 'tinymce'));
fse.copySync(path.join(__dirname, 'node_modules', 'tinymce'), path.join(__dirname, 'public', 'tinymce'), { overwrite: true });
