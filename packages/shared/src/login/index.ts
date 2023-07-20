import { z } from "zod"
import { genFullOutType } from "../utils"

export const path = "/api/login" as const

export const input = z.object({
  username: z.string(),
  password: z.string(),
  remember: z.boolean(),
})

export const data = z.object({
  token: z.string(),
})

export const errCode = ["wrong-password", "user-not-found"] as const

export const output = genFullOutType(data, errCode)
