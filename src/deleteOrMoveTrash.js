import fs from "fs-extra"
import trash from "trash"

/**
 * 移除文件或文件夹
 * @param {string} fileOrDirPath - 文件或文件夹路径
 * @param {string} actionType - 操作类型： "delete" - 彻底删除， "trash" - 移到回收站
 */
export default async function deleteOrMoveTrash(fileOrDirPath, actionType = "trash") {
  try {
    if (actionType === "delete") {
      await fs.remove(fileOrDirPath)
      console.log("File removed!")
    } else if (actionType === "trash") {
      await trash(fileOrDirPath)
      console.log("File moved to trash")
    }
  } catch (err) {
    throw Error(err)
  }
}

deleteOrMoveTrash("/Users/fangqipeng/Documents/前端/个人项目/node/aaa")
