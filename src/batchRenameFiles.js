import { rename } from "./utils.js"
import backupFiles from "./backupFiles.js"

/**
 * 批量重命名目录中指定文件名的文件
 * @param {string} dirPath 目标目录路径
 * @param {Array} [reg, replacement] 由正则表达式和替换字符串组成的数组
 */
export default function batchRenameFiles(dirPath, [reg, replacement]) {
  backupFiles(dirPath, (_, fileName) => {
    rename(dirPath, fileName, fileName.replace(reg, replacement))
  })
}

const reg = /\s+/g
const replacement = ""
batchRenameFiles("/Users/fangqipeng/Documents/前端/个人项目/node/assets", [reg, replacement])
