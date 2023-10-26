import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const ProfileSchema = z
  .object({
    id: z.string().default(''),
    username: z
      .string()
      .toLowerCase()
      .min(3, 'O Nome de Usuário deve conter no mínimo 3 caracteres'),
    website: z.string().toLowerCase().url('Digite uma url válida').nullish(),
    avatar_url: z.string().toLowerCase().url('Digite uma url válida').nullish(),
    full_name: z
      .string()
      .min(6, 'O Nome Completo deve conter no mínimo 6 caracteres')
      .nullish(),
  })
  .nullable()
export const ProfileCastingSchema = z.object({
  id: z.string().nullish(),
  username: z.string().nullish(),
  website: z.string().nullish(),
  avatar_url: z.string().nullish(),
  full_name: z.string().nullish(),
})

export const validationProfileSchema = toTypedSchema(ProfileSchema)

export type Profile = z.infer<typeof ProfileSchema>
export type ProfileCasting = z.infer<typeof ProfileCastingSchema>
