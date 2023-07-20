import express, { NextFunction, Request, Response } from "express"
import os from "os"
import url from "url"
import { 中间件, 获得中间件实现, 获得中间件路径 } from "./中间件"

const 值: unique symbol = Symbol("值")

export type http服务器 = {
  [值]: {
    中间件们: 中间件[]
    端口: number
  }
}

export function 创建http服务器(中间件们: 中间件[], 端口: number): http服务器 {
  return { [值]: { 中间件们, 端口 } }
}
export async function 运行http服务器(a: http服务器) {
  var app = express()

  // 支持中文路径
  app.use(function (req: Request, _res: Response, next: NextFunction) {
    var url对象 = url.parse(req.url)
    if (url对象.pathname == null || url对象.path == null) return next()
    req.url = req.originalUrl = url对象.path.replace(
      url对象.pathname,
      decodeURIComponent(url对象.pathname),
    )
    next()
  })

  for (var o of a[值].中间件们) {
    var 实现 = 获得中间件实现(o)
    if (o.构造子 == "不带路径的中间件") {
      app.use(实现)
      continue
    }
    if (o.构造子 == "带路径的中间件") {
      app.use(获得中间件路径(o), 实现)
      continue
    }
    var _类型检查: never = o
    throw new Error("意外的构造子")
  }

  await new Promise((res, _rej) => {
    app.listen(a[值].端口, () => {
      res(null)
    })
  })

  return Object.values(os.networkInterfaces())
    .flat()
    .map((a) => a?.address)
    .filter((a) => a != "" && a != null)
    .map((x) => `http://${x}:${a[值].端口}`)
}
