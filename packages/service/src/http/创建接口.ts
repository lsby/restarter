import { z } from "zod"
import { 从逻辑接口创建接口, 创建逻辑接口, 计算接口实现 } from "./逻辑接口"

export function 创建接口<
  A extends z.ZodType<any, any, any>,
  B extends z.ZodType<any, any, any>,
  C extends readonly string[],
>(
  地址: string,
  输入检查器: A,
  返回检查器: B,
  错误码枚举: C,
  实现: 计算接口实现<A, B, C>,
) {
  return 从逻辑接口创建接口(
    地址,
    创建逻辑接口<A, B, C>(输入检查器, 返回检查器, 错误码枚举, 实现),
  )
}
