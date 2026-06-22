// import { fetchCategoryStoresAction } from '@/features/user/delivery/action';
// import { fetchSubcategories, fetchStores } from './service';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';


// export function useStoresQuery(params: {
//   categoryId?: string;
//   latitude?: string;
//   longitude?: string;
//   page?: string;
//   limit?: string;
//   search?: string;
//   radiusKm?: string;
//   subcategoryId?: string;
// }) {
//   return useQuery({
//     queryKey: ['stores', params],
//     queryFn: () =>
//       fetchCategoryStoresAction(
//         params.categoryId,
//         params.latitude ? parseFloat(params.latitude) : undefined,
//         params.longitude ? parseFloat(params.longitude) : undefined,
//         params.subcategoryId,
//         params.page ? parseInt(params.page) : undefined,
//         params.limit ? parseInt(params.limit) : undefined,
//         params.search,
//         params.radiusKm ? parseFloat(params.radiusKm) : undefined,
//       ),
//     placeholderData: keepPreviousData,
//     staleTime: 1000 * 60,
//   });
// }
