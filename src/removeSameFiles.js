import fs from "fs"
import findSameFiles from "./findSameFiles.js"

/**
 * 移除目录中的重复文件
 * @param {string} dirPath - 目录路径
 * @returns {void}
 */
export default function removeSameFiles(dirPath) {
  const sameFiles = findSameFiles(dirPath)
  Object.values(sameFiles).forEach((fileGroups) => {
    fileGroups.forEach((group) => {
      group
        .sort((a, b) => a.fileName.localeCompare(b.fileName))
        .forEach((file, index) => {
          if (index) {
            fs.unlinkSync(file.filePath)
          }
        })
    })
  })
}

removeSameFiles("/Users/fangqipeng/Documents/前端/个人项目/node/assets")
