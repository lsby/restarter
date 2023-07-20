import { z } from "zod"

export function genFullOutType<
  A extends z.AnyZodObject,
  B extends readonly [string, ...string[]] | readonly [],
>(data: A, errEnum: B) {
  return z
    .object({
      err: z.enum([...errEnum, "unknown error"]),
    })
    .or(
      z.object({
        err: z.null(),
        data: data,
      }),
    )
}
