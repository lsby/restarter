import chalk from "chalk"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function getEnv() {
  var NODE_ENV = process.env["NODE_ENV"]
  if (NODE_ENV == null) throw new Error("没有指定运行环境")

  console.log("使用" + chalk.red(NODE_ENV) + "环境")
  dotenv.config({ path: path.resolve(__dirname, `../../.env/${NODE_ENV}.env`) })

  if (process.env.DB_URL == null) throw new Error("无法读取DB_URL")
  var dbInfo = parseDatabaseUrl(process.env.DB_URL)
  process.env = Object.assign(process.env, dbInfo)

  type isNumber = ["DB_PORT", "APP_PORT"]
  var isNumber: isNumber = ["DB_PORT", "APP_PORT"]

  type isString = [
    "NODE_ENV",
    "DB_HOST",
    "DB_USER",
    "DB_PWD",
    "DB_NAME",
    "WX_APPID",
    "WX_SECRET",
    "WX_MCHID",
    "WX_MCHKEY",
    "WX_PAY_CB",
    "OA2_SECRET",
    "OA2_TIME",
  ]
  var isString: isString = [
    "NODE_ENV",
    "DB_HOST",
    "DB_USER",
    "DB_PWD",
    "DB_NAME",
    "WX_APPID",
    "WX_SECRET",
    "WX_MCHID",
    "WX_MCHKEY",
    "WX_PAY_CB",
    "OA2_SECRET",
    "OA2_TIME",
  ]

  type r_Number<arr> = arr extends []
    ? []
    : arr extends [infer a, ...infer as]
    ? a extends string
      ? Record<a, number> & r_Number<as>
      : never
    : never
  type r_String<arr> = arr extends []
    ? []
    : arr extends [infer a, ...infer as]
    ? a extends string
      ? Record<a, string> & r_String<as>
      : never
    : never
  type r = r_Number<isNumber> & r_String<isString>

  var data_Number = isNumber
    .map((a) => ({ [a]: Number(process.env[a]) }))
    .reduce((s, a) => Object.assign(s, a), {})
  var data_String = isString
    .map((a) => ({ [a]: process.env[a] }))
    .reduce((s, a) => Object.assign(s, a), {})

  var 存在判断_Number = Object.values(data_Number).filter((a) => isNaN(a))
  var 存在判断_String = Object.values(data_Number).filter((a) => a == null)
  if (存在判断_Number.length != 0 && 存在判断_String.length != 0)
    throw "环境变量错误"

  var data = { ...data_Number, ...data_String }
  return data as unknown as r
}
function parseDatabaseUrl(databaseUrl: string) {
  const regex = /mysql:\/\/(.*):(.*)@(.+):(\d+)\/(.+)/
  const matches = databaseUrl.match(regex)

  if (!matches || matches.length !== 6) {
    throw new Error("Invalid database URL format")
  }

  const [, user, password, host, port, dbName] = matches

  return {
    DB_HOST: host,
    DB_PORT: port,
    DB_USER: user,
    DB_PWD: password,
    DB_NAME: dbName,
  }
}
