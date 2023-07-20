import { z } from "zod"
import { genFullOutType } from "../utils"

export const path = "/add" as const

export const input = z.object({
  a: z.number(),
  b: z.number(),
})

export const data = z.object({
  result: z.number(),
})

export const errCode = [] as const

export const output = genFullOutType(data, errCode)
