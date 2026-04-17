// import Link from 'next/link';

// interface Order {
//   id: string;
//   orderNumber?: string;
//   orderStatus?: string;
//   paymentStatus?: string;
//   totalAmount?: number;
//   amount?: number;
//   createdAt?: string;
// }

// function statusColor(status?: string) {
//   if (!status) return 'bg-neutral-200 text-neutral-600';

//   const s = status.toUpperCase();

//   if (s === 'DELIVERED' || s === 'PAID' || s === 'CONFIRMED') {
//     return 'bg-green-100/20 text-green-700';
//   }

//   if (s === 'CANCELLED') {
//     return 'bg-red-100/30 text-red-700';
//   }

//   if (s === 'AWAITING_PAYMENT' || s === 'CREATED') {
//     return 'bg-blue-100/20 text-blue-700';
//   }

//   return 'bg-primary/10 text-primary';
// }

// function formatDate(date?: string) {
//   if (!date) return '—';

//   return new Date(date).toLocaleDateString('en-NG', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   });
// }

// export default function OrdersList({ orders }: { orders: Order[] }) {
//   return (
//     <div className="mt-6 space-y-4">
//       {orders.slice(0, 5).map((order) => {
//         const id = order.id ?? '';

//         return (
//           <div
//             key={id}
//             className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/40 transition"
//           >
//             {/* Left */}
//             <div className="space-y-1">
//               <p className="text-sm font-medium">#{order.orderNumber ?? id}</p>

//               <div className="flex items-center gap-2 text-xs text-neutral-500">
//                 <span>{formatDate(order.createdAt)}</span>

//                 <span
//                   className={`px-2 py-0.5 rounded-full text-[0.65rem] capitalize ${statusColor(
//                     order.orderStatus,
//                   )}`}
//                 >
//                   {order.orderStatus?.toLowerCase().replace(/_/g, ' ') ??
//                     'unknown'}
//                 </span>
//               </div>
//             </div>

//             {/* Right */}
//             <div className="text-right space-y-1">
//               <p className="text-sm font-semibold">
//                 ₦{(order.totalAmount ?? order.amount ?? 0).toLocaleString()}
//               </p>

//               <p className="text-[0.7rem] text-neutral-400 capitalize">
//                 {order.paymentStatus?.toLowerCase().replace(/_/g, ' ') ?? '—'}
//               </p>
//             </div>
//           </div>
//         );
//       })}

//       {/* View all */}
//       <div className="pt-2 text-right">
//         <Link
//           href="/user/delivery"
//           className="text-xs text-primary font-medium hover:underline"
//         >
//           View all orders →
//         </Link>
//       </div>
//     </div>
//   );
// }
