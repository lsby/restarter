import * as routesWithoutPrefixObj from "./interface/index"
import {
  AddPrefixForArray,
  ArrayToUnion,
  DistributedHelper,
  UnionToIntersection,
  prefix,
  取对象值们,
} from "./utils"

const routesWithoutPrefix: 取对象值们<typeof routesWithoutPrefixObj> =
  Object.values(routesWithoutPrefixObj) as any

export const unknownError = "UNKNOWN_ERROR" as const
export const routes = routesWithoutPrefix.map((r) => {
  return {
    ...r,
    path: `${prefix}${r.path}`,
  }
}) as unknown as AddPrefixForArray<typeof routesWithoutPrefix>

export type OutputType<T, Err extends readonly string[]> =
  | {
      err: ArrayToUnion<Err> | typeof unknownError
      data: null
    }
  | {
      err: null
      data: T
    }
export type Route = UnionToIntersection<
  DistributedHelper<ArrayToUnion<typeof routes>>
>
