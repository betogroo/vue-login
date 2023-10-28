import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

// default value to fast tests
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .toLowerCase()
    .email('Email Inválido')
    .default('luizhumberto@gmail.com'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 dígitos')
    .default('123456'),
})

export const SignupSchema = z
  .object({
    passwordConfirm: z
      .string()
      .min(1, 'É necessário confirmar a senha')
      .min(6, 'A confirmação deve ter no mínimo 6 dígitos')
      .optional(),
  })
  .merge(LoginSchema)
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas devem ser idênticas',
    path: ['passwordConfirm'],
  })

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  created_at: z.string(),
  updated_at: z.string(),
  last_sign_in_at: z.string(),
})

export const validationLoginSchema = toTypedSchema(LoginSchema)
export const validationSignupSchema = toTypedSchema(SignupSchema)

export type Credentials = z.infer<typeof SignupSchema>
export type User = z.infer<typeof UserSchema> | null
export type { AuthUser } from '@supabase/supabase-js'
