import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const EmailSchema = z
  .string()
  .min(1, 'O email é obrigatório')
  .email('Email Inválido')
  .default('luizhumberto@gmail.com')

export const PasswordSchema = z
  .string()
  .min(1, 'A senha é obrigatória')
  .min(6, 'A senha deve ter no mínimo 6 dígitos')
  .default('123456')

export const FullNameSchema = z
  .string()
  .min(1, 'O nome é obrigatório')
  .min(3, 'A Nome deve ter no mínimo 3 dígitos')
  .trim()
  .refine(
    (data) => {
      const words = data.split(/\s+/)
      return words.length >= 2
    },
    {
      message: 'Deve conter pelo menos o nome e sobrenome',
    },
  )

// default value to fast tests
export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
})

export const ResetSchema = z.object({
  email: EmailSchema,
})

export const SignupSchema = z
  .object({
    passwordConfirm: z
      .string()
      .min(1, 'É necessário confirmar a senha')
      .min(6, 'A confirmação deve ter no mínimo 6 dígitos')
      .optional(),
    full_name: FullNameSchema,
  })
  .merge(LoginSchema)
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas devem ser idênticas',
    path: ['passwordConfirm'],
  })

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  last_sign_in_at: z.string(),
})

export const validationLoginSchema = toTypedSchema(LoginSchema)
export const validationSignupSchema = toTypedSchema(SignupSchema)
export const validationResetSchema = toTypedSchema(ResetSchema)

export type Credentials = z.infer<typeof SignupSchema>
export type User = z.infer<typeof UserSchema> | null
export type Reset = z.infer<typeof ResetSchema>
export type { AuthUser } from '@supabase/supabase-js'
