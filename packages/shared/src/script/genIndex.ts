import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function 获得当前文件夹的ts文件路径(
  root: string,
  folderPath: string = root,
): { path: string; url: string }[] {
  return fs.readdirSync(folderPath).flatMap((file) => {
    const t = path.join(folderPath, file)
    return fs.statSync(t).isDirectory()
      ? []
      : path.extname(t) === ".ts"
      ? [
          {
            path: path.resolve(root, t),
            url:
              "./" +
              path.relative(root, t).replace(/\\/g, "/").replace(/.ts$/g, ""),
          },
        ]
      : []
  })
}
function 创建index(p: string): number {
  var 所有文件名 = 获得当前文件夹的ts文件路径(p)
    .map((a) => a.url)
    .filter((a) => a !== "./index")
    .map((a) => ({ 文件名: a, 大驼峰: 连字符转大驼峰(a.replace("./", "")) }))
  var 所有子文件夹对象 = 获得当前文件夹的直接子文件夹路径(p)
  var 所有子文件夹 = 所有子文件夹对象
    .map((a) => a.url)
    .map((a) => ({ 文件名: a, 大驼峰: 连字符转大驼峰(a.replace("./", "")) }))

  var 生成代码 = [
    "// 该文件由脚本创建, 请不要修改.",
    所有文件名.length === 0
      ? null
      : 所有文件名
          .map((a) => `export * as ${a.大驼峰} from "${a.文件名}"`)
          .join("\n"),
    所有文件名.length === 0 ? null : "",
    所有子文件夹.length === 0
      ? null
      : 所有子文件夹
          .map((a) => `export * as ${a.大驼峰} from "${a.文件名}/index"`)
          .join("\n"),
    所有子文件夹.length === 0 ? null : "",
  ]
    .filter((a) => a !== null)
    .join("\n")

  var 计数器 = 0
  获得当前文件夹的直接子文件夹路径(p)
    .map((a) => a.path)
    .forEach((pp) => {
      var x = 创建index(pp)
      计数器 += x
    })

  fs.writeFileSync(path.resolve(p, "./index.ts"), 生成代码)

  return 计数器 + 1
}
function 连字符转大驼峰(input: string): string {
  const words = input.split(/[-]/)
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  )
  return capitalizedWords.join("")
}
function 获得当前文件夹的直接子文件夹路径(
  root: string,
  folderPath: string = root,
): { path: string; url: string }[] {
  return fs.readdirSync(folderPath).flatMap((file) => {
    const t = path.join(folderPath, file)
    return fs.statSync(t).isDirectory()
      ? [
          {
            path: path.resolve(root, t),
            url: "./" + path.relative(root, t).replace(/\\/g, "/"),
          },
        ]
      : []
  })
}

console.log("========生成开始========")
try {
  创建index(path.resolve(__dirname, "../interface"))
} catch (e: unknown) {
  console.error("错误: " + String(e))
}
console.log("========生成结束========")
