

import { useQuery } from '@tanstack/react-query'
import { apiHoliday } from '@/actions/holidayAction'

export const useGetHoliday = ({
  enabled = true,
  year
}: {
  enabled?: boolean
  year: number
}) =>
  useQuery({
    queryKey: ['holiday'],
    queryFn: () => apiHoliday.getAll(year),
    enabled,
  })



