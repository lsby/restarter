import { z } from "zod"

export const path = "/login" as const

export const input = z.object({
  username: z.string(),
  password: z.string(),
  remember: z.boolean(),
})

export const data = z.object({
  token: z.string(),
})

export const errCode = ["wrong-password", "user-not-found"] as const
