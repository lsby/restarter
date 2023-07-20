import { z } from "zod"
import { prefix, routesWithoutPrefix } from ".."

export type OutputType<T, Err extends readonly string[]> =
  | {
      err: ArrayToUnion<Err> | "unknown error"
      data: null
    }
  | {
      err: null
      data: T
    }

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

type AddPrefixForArray<Arr> = Arr extends readonly []
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

type DistributedHelper<T> = T extends RouteItem ? Helper<T> : never

type ArrayToUnion<T extends readonly any[]> = T[number]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never

export const routes = routesWithoutPrefix.map((r) => {
  return {
    ...r,
    path: `${prefix}${r.path}`,
  }
}) as unknown as AddPrefixForArray<typeof routesWithoutPrefix>

export type Route = UnionToIntersection<
  DistributedHelper<ArrayToUnion<typeof routes>>
>
