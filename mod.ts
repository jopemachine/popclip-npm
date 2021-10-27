import __ from 'https://deno.land/x/dirname/mod.ts';
import * as path from "https://deno.land/std@0.110.0/path/mod.ts";
import { JSZip } from "https://deno.land/x/jszip/mod.ts";

import { emptyDirSync, ensureDirSync } from 'https://deno.land/std@0.113.0/fs/mod.ts';
const { __dirname } = __(import.meta);

const targets = [
  'Config.plist',
  'icon.png',
  'open.applescript'
];

const cwd = __dirname;
const packageName = path.basename(cwd);
const extName = packageName + '.popclipext';
const dst = path.resolve(cwd, extName);

ensureDirSync(extName);
emptyDirSync(extName);

const zip = new JSZip();
const pkgFolder = zip.folder(extName);

for (const target of targets) {
  const srcFile = path.resolve(cwd, target);
  const content = Deno.readFileSync(srcFile);

  pkgFolder.addFile(target, content);
}

await zip.writeZip(path.resolve(cwd, packageName + '.popclipextz'));

Deno.removeSync(dst);