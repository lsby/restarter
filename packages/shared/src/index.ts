import { z } from "zod"
import { genFullOutType } from "./utils"

// TODO: add more routes
import * as addRoute from "./add"
import * as loginRoute from "./login"

export const routes = [addRoute, loginRoute] as const

export type RouteItem = {
  readonly path: string
  input: z.AnyZodObject
  data: z.AnyZodObject
  output: ReturnType<typeof genFullOutType>
  errCode: readonly string[]
}

type Helper<T extends RouteItem> = Record<
  T["path"],
  {
    input: z.infer<T["input"]>
    data: z.infer<T["data"]>
    output: z.infer<T["output"]>
    errCode: T["errCode"]
  }
>

type DistributedHelper<T> = T extends RouteItem ? Helper<T> : never

type ArrayToUnion<T extends readonly any[]> = T[number]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never

export type Route = UnionToIntersection<
  DistributedHelper<ArrayToUnion<typeof routes>>
>
