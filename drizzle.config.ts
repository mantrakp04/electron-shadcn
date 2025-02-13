import type { Config } from 'drizzle-kit'

export default {
  schema: './src/helpers/ipc/api/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite'
} satisfies Config