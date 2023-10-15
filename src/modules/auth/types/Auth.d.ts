import type { AuthUser } from '@supabase/supabase-js'

export interface Credentials {
  email: string
  password: string
  passwordConfirm?: string
}

export { AuthUser }
