import { traverseDirFilesStatSync, rename } from "./utils.js"
import backupFiles from "./backupFiles.json" assert { type: "json" }

/**
 * 恢复指定目录下的文件修改
 * @param {string} dirPath - 待恢复文件修改的目录路径
 * @returns {void}
 */
export default function undoFileChanges(dirPath) {
  traverseDirFilesStatSync(dirPath, (stats, currentFileName) => {
    backupFiles.find(({ fileName: preFileName, ino, size, birthtime }) => {
      if ((stats.size === size && stats.birthtime === birthtime) || stats.ino === ino) {
        rename(dirPath, currentFileName, preFileName)
        return true
      }
      return false
    })
  })
}

undoFileChanges("/Users/fangqipeng/Documents/前端/个人项目/node/assets")
