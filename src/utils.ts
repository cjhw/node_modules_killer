import fs from "fs/promises";
import path from "path";

export async function searchDir(
  dirPath: string,
  searchName: string = "node_modules",
  foundDirs: string[]
) {
  let children;
  try {
    children = await fs.readdir(dirPath);
  } catch (e) {
    return;
  }

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    const childPath = path.join(dirPath, child);
    const res = await fs.lstat(childPath);
    if (await res.isSymbolicLink()) {
      // 软链是读取会报错
      break;
    }

    if (res.isDirectory() && !child.startsWith(".")) {
      if (child === searchName) {
        console.log(childPath);
        foundDirs.push(childPath);
      } else {
        await searchDir(childPath, searchName, foundDirs);
      }
    }
  }

  return foundDirs;
}
export async function dirSize(dirPath) {
  let totalSize = 0;

  let children;
  try {
    children = await fs.readdir(dirPath);
  } catch (e) {
    return;
  }

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    const childPath = path.join(dirPath, child);
    const res = await fs.lstat(childPath);

    if (await res.isSymbolicLink()) {
      break;
    }

    if (res.isDirectory()) {
      totalSize += await dirSize(childPath);
    } else {
      totalSize += res.size;
    }
  }
  return totalSize;
}

export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (e) {
    return false;
  }
}
export async function removeFileOrDir(dirs: string[]) {
  for (let i = 0; i < dirs.length; i++) {
    if (await fileExists(dirs[i])) {
      await fs.rm(dirs[i], { recursive: true });
      console.log(dirs[i], "removed");
    }
  }
}
