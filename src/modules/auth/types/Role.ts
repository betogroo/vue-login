import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const RoleSchema = z.object({
  id: z.number().nullish(),
  title: z.string().min(1, 'Campo Obrigatório'),
  description: z.string().max(20, 'Máximo 20 caracteres'),
  user_id: z.string().nullish(),
})

export const validationRoleSchema = toTypedSchema(RoleSchema)

export type Role = z.infer<typeof RoleSchema> | null
