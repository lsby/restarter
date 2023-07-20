import { z } from "zod"

export type 取对象值们<
  obj,
  剩余的键 extends any[] = 联合转元组<keyof obj>,
> = 剩余的键 extends []
  ? []
  : 剩余的键 extends [infer a, ...infer as]
  ? a extends keyof obj
    ? [obj[a], ...取对象值们<obj, as>]
    : never
  : never

// https://github.com/type-challenges/type-challenges/issues/2835
type LastUnion<T> = UnionToIntersection<
  T extends any ? (x: T) => any : never
> extends (x: infer L) => any
  ? L
  : never
type 联合转元组<T, Last = LastUnion<T>> = [T] extends [never]
  ? []
  : [...联合转元组<Exclude<T, Last>>, Last]

export const prefix = "/api"
type Prefix = typeof prefix

type RouteItem = {
  readonly path: string
  input: z.AnyZodObject
  data: z.AnyZodObject
  errCode: readonly string[]
}

type AddPrefix<T, P extends string = ""> = T extends RouteItem
  ? {
      path: `${P}${T["path"]}`
      input: T["input"]
      data: T["data"]
      errCode: T["errCode"]
    }
  : never

export type AddPrefixForArray<Arr> = Arr extends readonly []
  ? []
  : Arr extends readonly [infer A, ...infer B]
  ? [AddPrefix<A, Prefix>, ...AddPrefixForArray<B>]
  : never

type Helper<T> = T extends RouteItem
  ? Record<
      T["path"],
      {
        input: z.infer<T["input"]>
        data: z.infer<T["data"]>
        errCode: T["errCode"]
      }
    >
  : never

export type DistributedHelper<T> = T extends RouteItem ? Helper<T> : never

export type ArrayToUnion<T extends readonly any[]> = T[number]

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never
