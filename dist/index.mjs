var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
import fs2 from "fs/promises";
import os from "os";

// src/utils.ts
import fs from "fs/promises";
import path from "path";
function searchDir(dirPath, searchName = "node_modules", foundDirs2) {
  return __async(this, null, function* () {
    let children;
    try {
      children = yield fs.readdir(dirPath);
    } catch (e) {
      return;
    }
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childPath = path.join(dirPath, child);
      const res = yield fs.lstat(childPath);
      if (yield res.isSymbolicLink()) {
        break;
      }
      if (res.isDirectory() && !child.startsWith(".")) {
        if (child === searchName) {
          console.log(childPath);
          foundDirs2.push(childPath);
        } else {
          yield searchDir(childPath, searchName, foundDirs2);
        }
      }
    }
    return foundDirs2;
  });
}
function dirSize(dirPath) {
  return __async(this, null, function* () {
    let totalSize = 0;
    let children;
    try {
      children = yield fs.readdir(dirPath);
    } catch (e) {
      return;
    }
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childPath = path.join(dirPath, child);
      const res = yield fs.lstat(childPath);
      if (yield res.isSymbolicLink()) {
        break;
      }
      if (res.isDirectory()) {
        totalSize += yield dirSize(childPath);
      } else {
        totalSize += res.size;
      }
    }
    return totalSize;
  });
}

// src/index.ts
var homedir = os.homedir();
var foundDirs = [];
function main() {
  return __async(this, null, function* () {
    yield searchDir(homedir, "node_modules", foundDirs);
    const size = yield dirSize("./node_modules");
    console.log(size);
    yield fs2.writeFile("./found", foundDirs.join(os.EOL));
    const str = yield fs2.readFile("./found", { encoding: "utf-8" });
    const dirs = str.split(os.EOL);
    console.log("done");
  });
}
main();
