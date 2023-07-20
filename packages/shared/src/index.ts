// TODO: add more routes
import * as addRoute from "./add"
import * as loginRoute from "./login"

export const routesWithoutPrefix = [addRoute, loginRoute] as const

export const prefix = "/api" as const
