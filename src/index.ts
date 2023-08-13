import fs from "fs/promises";
import os from "os";
import path from "path";
import { dirSize, removeFileOrDir, searchDir } from "./utils";

const homedir = os.homedir();

const foundDirs = [];

async function main() {
  // 搜索某个目录的下的所有xxx文件夹并删除,默认xxx是node_modules,慎用
  await searchDir(homedir, "node_modules", foundDirs);
  const size = await dirSize("./node_modules");
  console.log(size);

  await fs.writeFile("./found", foundDirs.join(os.EOL));

  const str = await fs.readFile("./found", { encoding: "utf-8" });
  const dirs = str.split(os.EOL);
  //   await removeFileOrDir(dirs);

  console.log("done");
}

main();
