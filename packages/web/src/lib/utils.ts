import { clsx, type ClassValue } from "clsx"
import type { OutputType } from "shared/utils"
import { routes, type Route } from "shared/utils"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fetcher<A extends keyof Route>(
  path: A,
  input: Route[A]["input"],
) {
  return async () => {
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })

    const route = routes.find((r) => r.path === path)
    if (!route) throw new Error("Route not found")

    const parseResult = route.input.safeParse(input)
    if (!parseResult.success) throw new Error(parseResult.error.message)

    const data = (await res.json()) as OutputType<
      Route[A]["data"],
      Route[A]["errCode"]
    >

    if (data.err) {
      throw new Error(data.err)
    }
    return data.data as Route[A]["data"]
  }
}
