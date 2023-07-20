import * as addRoute from "./interface/add"
import * as loginRoute from "./interface/login"

export const routesWithoutPrefix = [addRoute, loginRoute] as const
