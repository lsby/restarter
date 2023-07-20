import type { ColumnType } from "kysely"
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>
export type user = {
  id: Generated<number>
  createdAt: Generated<Timestamp>
  name: string
  pwd: string
}
export type DB = {
  user: user
}
