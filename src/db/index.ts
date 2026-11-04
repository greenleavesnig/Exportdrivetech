import { drizzle } from 'drizzle-orm/d1-http'
import { drizzle as drizzleLocal } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'

export function getDB(d1: D1Database) {
  return drizzle(d1, { schema })
}

export function getLocalDB() {
  const sqlite = new Database('./local.db')
  return drizzleLocal(sqlite, { schema })
}
