import { Request, Response, NextFunction } from "express"

const 值: unique symbol = Symbol("值")
const 带路径的中间件_烙印: unique symbol = Symbol("带路径的中间件_烙印")
const 不带路径的中间件_烙印: unique symbol = Symbol("不带路径的中间件_烙印")

export type 带路径的中间件 = {
  readonly 构造子: "带路径的中间件"
  [带路径的中间件_烙印]: true
  [值]: {
    路径: string
    实现: (req: Request, res: Response, next: NextFunction) => void
  }
}
export type 不带路径的中间件 = {
  readonly 构造子: "不带路径的中间件"
  [不带路径的中间件_烙印]: true
  [值]: {
    实现: (req: Request, res: Response, next: NextFunction) => void
  }
}
export type 中间件 = 带路径的中间件 | 不带路径的中间件

export function 创建带路径的中间件(
  路径: string,
  实现: (req: Request, res: Response, next: NextFunction) => void,
): 带路径的中间件 {
  return {
    构造子: "带路径的中间件",
    [带路径的中间件_烙印]: true,
    [值]: { 路径, 实现 },
  }
}
export function 创建不带路径的中间件(
  实现: (req: Request, res: Response, next: NextFunction) => void,
): 不带路径的中间件 {
  return {
    构造子: "不带路径的中间件",
    [不带路径的中间件_烙印]: true,
    [值]: { 实现 },
  }
}

export function 获得中间件路径(a: 带路径的中间件) {
  return a[值].路径
}
export function 获得中间件实现(a: 中间件) {
  return a[值].实现
}

export function 是带路径的中间件(a: any) {
  if (a[带路径的中间件_烙印] != null) return true
  return false
}
