import fs from "fs"
import path from "path"
import mime from "mime-types"
import ignore from "ignore"

/**
 * 判断给定路径是否为目录
 * @param {string} dirPath - 需要判断的路径
 * @returns {boolean} 是否为目录
 */
export function isDirectory(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()
}

/**
 * 检查给定的路径是否为文件路径
 * @param {string} filePath - 文件路径
 * @returns {boolean} 如果指定路径是文件路径则返回 true，否则返回 false
 */
export function isFile(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
}

/**
 * 检查给定的文件路径是否为媒体文件（音频或视频文件）
 * @param {string} filePath - 需要检查的文件的路径
 * @returns {boolean} 如果文件路径对应的文件是音频或视频类型，则返回 true；否则返回 false
 */
export function isMediaFile(filePath) {
  if (!isFile(filePath)) return false
  const mimetype = mime.lookup(filePath)
  return mimetype && (mimetype.includes("video") || mimetype.includes("audio"))
}

/**
 * 确定指定的文件路径是否指向的是一个图片文件
 * @param {string} filePath - 要被检查的文件路径
 * @returns {boolean} 如果文件是图片文件则返回 true，否则返回 false
 */
export function isImageFile(filePath) {
  if (!isFile(filePath)) return false
  const mimetype = mime.lookup(filePath)
  return mimetype && mimetype.startsWith("image/")
}

/**
 * 同步地将给定的数据写入指定的文件
 * @param {string} filePath - 文件路径
 * @param {any} data - 要写入文件的数据
 * @returns {void}
 */
export function writeFileSync(filePath, data) {
  fs.writeFileSync(path.resolve(filePath), JSON.stringify(data, null, 2))
}

/**
 * 遍历指定文件夹下所有的文件并获取文件信息
 * @param {string} dirPath - 指定文件夹的路径
 * @param {(stats: fs.Stats, fileName: string, filePath: string) => void} callback - 处理每个文件的回调函数
 */
export function traverseDirFilesStatSync(dirPath, callback) {
  if (isDirectory(dirPath)) {
    const gitignore = fs.readFileSync(path.resolve("../.gitignore"), { encoding: "utf8" })
    const ig = ignore().add(gitignore)
    fs.readdirSync(dirPath).forEach((fileName) => {
      const filePath = path.join(dirPath, fileName)
      const stats = fs.statSync(filePath)
      if (stats.isFile() && !ig.ignores(fileName)) {
        callback(stats, fileName, filePath)
      }
    })
  }
}

/**
 * 重命名指定目录中的指定文件
 * @param {string} dir - 要重命名的文件所在的目录路径
 * @param {string} oldName - 要被重命名的文件名
 * @param {string} newName - 文件的新名称
 */
export function rename(dir, oldName, newName) {
  const oldPath = path.join(dir, oldName)
  const newPath = path.join(dir, newName)
  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err
  })
}
