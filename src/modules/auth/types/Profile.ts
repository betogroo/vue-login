import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const ProfileSchema = z.object({
  id: z.string().default(''),
  username: z.string().min(3),
  website: z.string().default(''),
  avatar_url: z.string().default(''),
  full_name: z.string().default(''),
})

export const validationProfileSchema = toTypedSchema(ProfileSchema)

export type Profile = z.infer<typeof ProfileSchema>
