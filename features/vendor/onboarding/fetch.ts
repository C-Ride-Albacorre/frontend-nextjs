import { useQuery } from '@tanstack/react-query';
import { getBusinessTypesAction } from './action';

export function useBusinessTypes() {
  return useQuery({
    queryKey: ['businessTypes'],
    queryFn: getBusinessTypesAction,
  });
}
