import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { UserSchema } from './Auth'

export const ProfileSchema = z.object({
  id: z.string().default(''),
  username: z
    .string()
    .toLowerCase()
    .min(3, 'O Nome de Usuário deve conter no mínimo 3 caracteres')
    .nullish(),
  website: z.string().toLowerCase().url('Digite uma url válida').nullish(),
  avatar_url: z.string().toLowerCase().url('Digite uma url válida').nullish(),
  full_name: z
    .string()
    .min(6, 'O Nome Completo deve conter no mínimo 6 caracteres')
    .nullish(),
})

export const UserProfileSchema = UserSchema.merge(
  ProfileSchema.partial(),
).partial()

export const validationProfileSchema = toTypedSchema(ProfileSchema)

export type Profile = z.infer<typeof ProfileSchema>
export type UserProfile = z.infer<typeof UserProfileSchema>
