import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getOrdersAction,
  getOrderDetailsAction,
  cancelOrderAction,
} from '../action';
import { toast } from 'sonner';

export function useOrders(enabled = true) {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const result = await getOrdersAction();
      console.log('[useOrders] Orders:', result);
      if (!result.success) throw new Error(result.error);
      return Array.isArray(result.data) ? result.data : [];
    },
    enabled,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });
}

export function useOrderDetails(orderId: string | null) {
  return useQuery<any>({
    queryKey: ['order-details', orderId],
    queryFn: async () => {
      if (!orderId) throw new Error('No order ID');
      const result = await getOrderDetailsAction(orderId);
      console.log('[useOrderDetails] Order details:', result);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!orderId,
    staleTime: 1000 * 15,
    refetchOnWindowFocus: false,
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const result = await cancelOrderAction(orderId);
      console.log('[useCancelOrder] Cancel order:', result);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast.success('Order cancelled');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cancel order');
    },
  });
}
