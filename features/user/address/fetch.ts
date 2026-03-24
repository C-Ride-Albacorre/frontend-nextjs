import { useQuery } from '@tanstack/react-query';
import { fetchSavedAddressesAction } from './action';

export function useAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: fetchSavedAddressesAction,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
