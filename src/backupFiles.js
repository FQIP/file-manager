import { writeFileSync, traverseDirFilesStatSync } from "./utils.js"

/**
 * 在一个指定的目录下查找所有文件并对这些文件进行备份操作。
 * @param {string} dirPath - 要备份文件的目录路径。
 * @returns {Array} 一个文件对象构成的数组，每个文件对象包含文件的名字、inode号码，大小，创建时间和本地时间。
 */
export default function backupFiles(dirPath, callback) {
  const files = []
  traverseDirFilesStatSync(dirPath, (...args) => {
    const [stats, fileName] = args
    const { ino, size, birthtime } = stats
    files.push({
      fileName,
      ino,
      size,
      birthtime: birthtime.getTime(),
      birthtimeLocal: birthtime.toLocaleDateString() + " " + birthtime.toLocaleTimeString(),
    })
    callback && callback(...args)
  })
  writeFileSync("backupFiles.json", files)
}

backupFiles("/Users/fangqipeng/Documents/前端/个人项目/node/assets")
