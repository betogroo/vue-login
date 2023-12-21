import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const RoleSchema = z.object({
  id: z.number().nullish(),
  name: z.string().min(1, 'Campo Obrigatório').toLowerCase().nullish(),
  description: z.string().min(1, 'Campo obrigatório').nullish(),
})

export const validationRoleSchema = toTypedSchema(RoleSchema)
export type Role = z.infer<typeof RoleSchema>
