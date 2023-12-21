import { supabase } from '@/plugins/supabase'
import type { Profile } from '../types/Profile'
import type { Role } from '../types/Role'

const useRole = () => {
  const getUserRoles = async (user_id: string): Promise<Role[] | undefined> => {
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('id, name, description, user_roles!inner()')
        .eq('user_roles.user_id', user_id)
        .returns<Role[]>()
      if (error) throw error
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const checkRoles = async (
    user_roles: Profile['roles'],
    role: number,
  ): Promise<boolean> => {
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id, name')
      .eq('id', role)

    console.log(roleData)
    return true
  }
  return { getUserRoles, checkRoles }
}

export default useRole
