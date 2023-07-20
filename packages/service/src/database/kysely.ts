import { Kysely, MysqlDialect } from "kysely"
import { createPool } from "mysql2"
import { DB } from "../../types/DataBase"
import { getEnv } from "../util/env"

export function getKysely() {
  var env = getEnv()
  return new Kysely<DB>({
    dialect: new MysqlDialect({
      pool: createPool({
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PWD,
        database: env.DB_NAME,
      }),
    }),
  })
}

export async function transaction<A>(
  db: Kysely<DB>,
  func: (trx: Kysely<DB>) => Promise<A>,
): Promise<A> {
  return await db.connection().execute(async (db) => {
    return db.transaction().execute(async (trx) => {
      return func(trx)
    })
  })
}
