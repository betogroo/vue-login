import { supabase } from '@/plugins/supabase'
import type { Profile } from '../types/Profile'

const useRole = () => {
  const getUserRoles = async (
    user_id: string,
  ): Promise<number[] | undefined> => {
    try {
      const { data: userRoles, error: roleError } = await supabase
        .from('user_roles')
        .select('role_id')
        .eq('user_id', user_id)
      if (roleError) throw roleError
      return userRoles.map((role) => role.role_id)
    } catch (err) {
      console.log(err)
    }
  }
  const testUserRoles = async (user_id: string): Promise<any> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, user_roles!inner(), roles!inner(id, title, description)')
        .eq('id', user_id)
        .single()
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
      .select('id, title')
      .eq('id', role)

    console.log(roleData)
    return true
  }
  return { getUserRoles, checkRoles, testUserRoles }
}

export default useRole
