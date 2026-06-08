import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../APIENDPOINT'
import type { User } from '../../types/user.type'

export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers,
    })
}