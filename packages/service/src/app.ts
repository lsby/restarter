import { 创建接口 } from "@/http/创建接口"
import { 创建正确返回类型, 创建错误返回类型 } from "@/http/逻辑接口"
import { 创建密码OAuth2 } from "@/middleware/创建密码OAuth2"
import { 计算接口实现类型 } from "@/util/type"
import * as shared from "shared"
import { 创建http服务器, 运行http服务器 } from "./http/http服务器"
import { 创建常用解析器组 } from "./middleware/创建常用解析器组"
import { getEnv } from "./util/env"

const value: unique symbol = Symbol("value")

export type App = {
  [value]: {}
}

export function mkApp(): App {
  return {
    [value]: {},
  }
}

export async function runApp(_app: App) {
  var env = getEnv()
  var 共享包索引 = shared.routes
    .map((a) => ({ [a.path]: { ...a } }))
    .reduce((s, a) => Object.assign(s, a), {})
  var OA2 = 创建密码OAuth2(env.OA2_SECRET, env.OA2_TIME)

  var 接口实现: 计算接口实现类型<typeof shared.routes> = {
    "/api/login": async (body, _payload) => {
      if (body.username != "admin") return 创建错误返回类型("USER_NOT_FOUND")
      if (body.password != "admin") return 创建错误返回类型("WRONG_PASSWORD")

      var 假装admin的用户id = 1
      return 创建正确返回类型({ token: OA2.token生成器(假装admin的用户id) })
    },
    "/api/add": async (body, payload) => {
      if (payload?.userId == null) return 创建错误返回类型("NO_LOGIN")
      return 创建正确返回类型({ result: body.a + body.b })
    },
  }

  var serviceInfo = await 运行http服务器(
    创建http服务器(
      [
        // 前置中间件
        ...创建常用解析器组(),
        OA2.注入中间件,
        // 接口
        ...Object.keys(接口实现).map((path) =>
          创建接口(
            path,
            共享包索引[path].input,
            共享包索引[path].data,
            共享包索引[path].errCode,
            (接口实现 as any)[path],
          ),
        ),
      ],
      env.APP_PORT,
    ),
  )

  console.log("加载接口: %O", Object.keys(接口实现))
  console.log("服务器地址: %O", serviceInfo)
}
