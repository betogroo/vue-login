import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().min(1, 'O email é obrigatório').email('EmailInválido'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 dígitos'),
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

export type Credentials = z.infer<typeof SignupSchema>
