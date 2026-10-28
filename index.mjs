import { readdir, lstat } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function analyze(root) {
  let files = 0n;
  let directories = 0n;
  let size = 0n;
  const pending = [root];
  while (pending.length) {
    const current = pending.pop();
    for (const name of await readdir(current)) {
      const path = join(current, name);
      const info = await lstat(path, { bigint: true });
      if (info.isFile()) {
        files++;
        size += info.size;
      } else if (info.isDirectory()) {
        directories++;
        pending.push(path);
      }
    }
  }
  return `507433-${files}-${directories}-${size}`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(await analyze('/data'));
  } catch (error) {
    console.error(`Filesystem analysis failed: ${error.message}`);
    process.exitCode = 1;
  }
}
