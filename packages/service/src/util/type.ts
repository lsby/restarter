import { 计算接口实现 } from "@/http/逻辑接口"
import { ZodType } from "zod"

export type 计算接口实现类型<Arr> = Arr extends []
  ? {}
  : Arr extends [infer x, ...infer xs]
  ? "path" extends keyof x
    ? "input" extends keyof x
      ? "data" extends keyof x
        ? "errCode" extends keyof x
          ? x["path"] extends string
            ? x["input"] extends ZodType<any, any, any>
              ? x["data"] extends ZodType<any, any, any>
                ? x["errCode"] extends readonly string[]
                  ? Record<
                      x["path"],
                      计算接口实现<x["input"], x["data"], x["errCode"]>
                    > &
                      计算接口实现类型<xs>
                  : never
                : never
              : never
            : never
          : never
        : never
      : never
    : never
  : never
