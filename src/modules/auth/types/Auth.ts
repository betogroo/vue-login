import type { AuthUser } from '@supabase/supabase-js'
import { object, z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const CredentialsSchema = object({
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Campo obrigatório')
    .min(6, 'No mínimo 6 dígitos'),
  passwordConfirm: z
    .string()
    .min(1, 'Campo obrigatório')
    .min(6, 'No mínimo 6 dígitos')
    .optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'As senhas não coincidem',
  path: ['passwordConfirm'],
})

export const validationSchema = toTypedSchema(CredentialsSchema)

export type Credentials = z.infer<typeof CredentialsSchema>

export { AuthUser }
