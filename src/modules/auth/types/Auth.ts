import { object, z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export type { AuthUser } from '@supabase/supabase-js'
export type Credentials = z.infer<typeof CredentialsSchema>

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

//export { AuthUser }
