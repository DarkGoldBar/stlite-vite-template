import fs from 'fs/promises';
import path from 'path';

export async function build_files(backendDir, publicDir, distDir) {
  backendDir = backendDir ?? 'backend';
  publicDir = publicDir ?? 'public';
  distDir = distDir ?? 'dist';

  await fs.access(path.resolve(backendDir));
  const out = await readPyFilesToDict(`./${backendDir}`);
  const images = await readPublicDir(`./${publicDir}`);
  Object.assign(out, images);

  await fs.mkdir(path.resolve(distDir), { recursive: true });
  await fs.writeFile(`${distDir}/files.json`, JSON.stringify(out, null, 2), 'utf8');
  const fcount = Object.keys(out).length;
  console.log(`Wrote ${fcount} file(s) to ${distDir}/files.json`);
}

export async function readPyFilesToDict(relPath) {
  const base = path.resolve(process.cwd());
  const out = {};

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (err) {
      console.error(`Unable to read directory: ${dir}`);
      return;
    }

    for (const entry of entries) {
      const full = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === '__pycache__') continue;
        await walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.py')) {
        const key = path.relative(base, full).split(path.sep).join('/');
        try {
          const content = await fs.readFile(full, 'utf8');
          out[key] = content;
        } catch (err) {
          console.error(`Unable to read directory: ${key}`);
        }
      }
    }
  }

  await walk(path.resolve(process.cwd(), relPath));
  return out;
}

export async function readPublicDir(publicDir) {
  const dir = path.resolve(process.cwd(), publicDir)
  const files = await fs.readdir(dir)
  const out = {}

  for (const file of files) {
    const key = `${publicDir}/${file}`
    out[key] = {
      url: `./${file}`,
    }
  }

  return out
}
