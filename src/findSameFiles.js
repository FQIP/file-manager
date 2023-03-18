import md5File from "md5-file"
import { isMediaFile, isImageFile, traverseDirFilesStatSync } from "./utils.js"

/**
 * @function findSameFiles
 * @description 给定一个目录路径，在该目录下搜索文件，并根据它们的相似性将其分组，返回一个包含分组文件的对象
 * @param {string} dirPath - 要搜索的目录路径
 * @returns {Object} - 包含按类型和相似性分组文件的对象
 */
export default function findSameFiles(dirPath) {
  const filesMap = {
    media: {},
    image: {},
    file: {},
  }
  traverseDirFilesStatSync(dirPath, (stats, fileName, filePath) => {
    const fileItem = {
      stats,
      fileName,
      filePath,
    }
    const fileType = isMediaFile(filePath) ? "media" : isImageFile(filePath) ? "image" : "file"
    const sameFilesKey = isMediaFile(filePath) ? stats.size : md5File.sync(filePath)
    if (filesMap[fileType][sameFilesKey]) {
      filesMap[fileType][sameFilesKey].push(fileItem)
    } else {
      filesMap[fileType][sameFilesKey] = [fileItem]
    }
  })

  return Object.entries(filesMap).reduce((acc, [fileType, files]) => {
    const sameFiles = Object.values(files).filter((fileItems) => fileItems.length > 1)
    if (sameFiles.length) {
      acc[fileType] = sameFiles
    }
    return acc
  }, {})
}

console.log("same.......", JSON.stringify(findSameFiles("/Users/fangqipeng/Documents/前端/个人项目/node/assets")))
