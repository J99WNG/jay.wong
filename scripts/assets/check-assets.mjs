import { existsSync } from 'node:fs';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const assetRoot = path.join(process.cwd(), 'public', 'assets');
const maximumAssetSize = 5 * 1024 * 1024;
const errors = [];
const sourceRoots = ['app', 'components', 'content', 'styles'];
const sourceExtensions = new Set(['.css', '.ts', '.tsx']);

async function inspectDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await inspectDirectory(entryPath);
      continue;
    }

    const relativePath = path.relative(process.cwd(), entryPath);
    const extension = path.extname(entry.name);
    const fileStats = await stat(entryPath);

    if (entry.name === '.DS_Store') errors.push(`${relativePath}: remove OS metadata`);
    if (extension !== extension.toLowerCase()) errors.push(`${relativePath}: use a lowercase extension`);
    if (fileStats.size > maximumAssetSize) {
      errors.push(`${relativePath}: exceeds the 5 MiB asset budget`);
    }
  }
}

async function inspectAssetReferences(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await inspectAssetReferences(entryPath);
      continue;
    }

    if (!sourceExtensions.has(path.extname(entry.name))) continue;

    const source = await readFile(entryPath, 'utf8');
    const references = source.matchAll(/['"`]\/assets\/([^'"`$}\s]+)/g);

    for (const match of references) {
      const publicPath = path.join(process.cwd(), 'public', 'assets', match[1]);
      if (!existsSync(publicPath)) {
        errors.push(`${path.relative(process.cwd(), entryPath)}: missing /assets/${match[1]}`);
      }
    }
  }
}

await inspectDirectory(assetRoot);
for (const sourceRoot of sourceRoots) {
  await inspectAssetReferences(path.join(process.cwd(), sourceRoot));
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Asset naming and size checks passed.');
}
