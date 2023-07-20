import { z } from "zod"
import * as addRoute from "./add"
import * as loginRoute from "./login"

export type RouteItem = {
  path: string
  input: z.AnyZodObject
  data: z.AnyZodObject
  output: any
  errCode: readonly string[]
}

export const routes = [addRoute, loginRoute] as const

export type Route = Record<
  typeof addRoute.path,
  {
    input: z.infer<typeof addRoute.input>
    data: z.infer<typeof addRoute.data>
    output: z.infer<typeof addRoute.output>
    errCode: typeof addRoute.errCode
  }
> &
  Record<
    typeof loginRoute.path,
    {
      input: z.infer<typeof loginRoute.input>
      data: z.infer<typeof loginRoute.data>
      output: z.infer<typeof loginRoute.output>
      errCode: typeof loginRoute.errCode
    }
  >
