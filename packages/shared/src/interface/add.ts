import { z } from "zod"

export const path = "/add" as const

export const input = z.object({
  a: z.number(),
  b: z.number(),
})

export const data = z.object({
  result: z.number(),
})

export const errCode = ["没有登录"] as const
