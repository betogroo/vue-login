import { supabase } from '@/plugins/supabase'

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
  return { getUserRoles }
}

export default useRole
