import { NextFunction, Request, Response, Router } from "express"
import { unknownError } from "shared"
import util from "util"
import * as uuid from "uuid"
import { ZodType, z } from "zod"
import { 创建带路径的中间件, 带路径的中间件 } from "./中间件"

const 值: unique symbol = Symbol("值")

type 只读元组转联合<T> = T extends readonly (infer U)[] ? U : never
export type 计算接口实现<
  input extends ZodType<any, any, any>,
  data extends ZodType<any, any, any>,
  errCode extends readonly string[],
> = (
  参数: z.infer<input>,
  负载: Request["payload"],
) => Promise<
  正确返回类型<z.infer<data>> | 错误返回类型<只读元组转联合<errCode>>
>

export type 逻辑接口<
  _A extends z.ZodType<any, any, any>,
  _B extends z.ZodType<any, any, any>,
  _C extends readonly string[],
> = {
  [值]: { func: (req: Request, res: Response) => Promise<void> }
}

export function 创建逻辑接口<
  A extends z.ZodType<any, any, any>,
  B extends z.ZodType<any, any, any>,
  C extends readonly string[],
>(
  输入检查器: A,
  返回检查器: B,
  _错误码枚举: C,
  实现: 计算接口实现<A, B, C>,
): 逻辑接口<A, B, C> {
  return {
    [值]: {
      func: async function (req: Request, res: Response) {
        var 参数 = req.body
        var 调用id = uuid.v1()
        var 调用时间 = new Date().getTime()

        const 返回错误 = (errorCode: string) => {
          const totalTime = new Date().getTime() - 调用时间
          console.error("%O", {
            行为: "接口调用结束",
            调用id: 调用id,
            路径: req.path,
            结果: "失败",
            消耗时间: totalTime,
            参数: util.inspect(参数, { compact: true }),
          })
          res.send(创建错误返回类型(errorCode)[值])
        }

        try {
          console.log("============================")
          console.log("%O", {
            行为: "接口调用开始",
            调用id,
            路径: req.path,
            参数,
          })

          var 验证参数 = 输入检查器.parse(参数)
          var 返回值 = await 实现(验证参数, req.payload)
          if (返回值.type == "HttpData") {
            var 验证返回值 = 返回检查器.parse(返回值[值].data)
            console.log("%O", {
              行为: "接口调用结束",
              调用id,
              路径: req.path,
              结果: "成功",
              消耗时间: new Date().getTime() - 调用时间,
              验证参数: 验证参数,
              验证返回值: 验证返回值,
            })
            res.send(创建正确返回类型(验证返回值)[值])
            return
          } else if (返回值.type == "HttpError") {
            var 错误码 = 返回值[值].err
            返回错误(错误码)
            return
          }

          const _typeCheck: never = 返回值
        } catch (e: unknown) {
          console.error(e)
          返回错误(unknownError)
        }
      },
    },
  }
}

export function 从逻辑接口创建接口<
  A extends z.ZodType<any, any, any>,
  B extends z.ZodType<any, any, any>,
  C extends string[],
>(地址: string, 逻辑接口: 逻辑接口<A, B, C>): 带路径的中间件 {
  var router = Router()
  router.post(
    地址,
    async (req: Request, res: Response, _next: NextFunction) => {
      await 逻辑接口[值].func(req, res)
    },
  )
  return 创建带路径的中间件("/", router)
}

export type 正确返回类型<A> = {
  readonly type: "HttpData"
  [值]: {
    err: null
    data: A
  }
}
export function 创建正确返回类型<A>(data: A): 正确返回类型<A> {
  return {
    type: "HttpData",
    [值]: { err: null, data },
  }
}

export type 错误返回类型<A extends string> = {
  type: "HttpError"
  [值]: {
    err: A
  }
}
export function 创建错误返回类型<A extends string>(e: A): 错误返回类型<A> {
  return {
    type: "HttpError",
    [值]: { err: e },
  }
}

export function 是逻辑接口(a: any) {
  if (a[值] != null) return true
  return false
}
