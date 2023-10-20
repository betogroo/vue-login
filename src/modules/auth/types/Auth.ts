import { object, z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const LoginSchema = object({
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Campo obrigatório')
    .min(6, 'No mínimo 6 dígitos'),
})

export const SignupSchema = object({
  passwordConfirm: z
    .string()
    .min(1, 'Campo obrigatório')
    .min(6, 'No mínimo 6 dígitos')
    .optional(),
})
  .merge(LoginSchema)
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  })

export const validationLoginSchema = toTypedSchema(LoginSchema)
export const validationSignupSchema = toTypedSchema(SignupSchema)

export type { AuthUser } from '@supabase/supabase-js'
export type Credentials = z.infer<typeof SignupSchema>
