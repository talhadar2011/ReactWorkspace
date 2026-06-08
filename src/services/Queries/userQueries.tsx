import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../APIENDPOINT'

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })
}