import Toolbar from '@/components/layout/tool-bar';
import OrderCard from './order-card';
import { getVendorOrderAction } from '../action';

export default async function OrdersWrapper() {
  const response = await getVendorOrderAction();

  const Orders = response.orders || [];

  console.log(Orders, 'orders baby');

  return (
    <>
      {/* <Toolbar
        title="Incoming Orders"
        searchPlaceholder="Search orders..."
        filter={}
        onFilterChange={}
        filterOptions={CATEGORIES}
      /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Orders.map((order) => {
          const customer = `${order.user?.firstName ?? ''} ${order.user?.lastName ?? ''}`;

          const items =
            order.items?.map(
              (item: {
                product?: { productName?: string; basePrice: number };
                quantity: number;
              }) => ({
                name: item.product?.productName ?? 'Unknown Product',
                quantity: item.quantity,

                basePrice: item.product?.basePrice ?? 0,
              }),
            ) ?? [];

          return (
            <OrderCard
              id={order.id}
              key={order.id}
              orderCode={order.orderCode}
              orderNumber={order.orderNumber}
              orderStatus={order.orderStatus}
              paymentStatus={order.paymentStatus}
              createdAt={order.createdAt}
              customer={customer}
              email={order.user?.email ?? 'N/A'}
              phoneNumber={order.user?.phoneNumber}
              items={items}
              subtotal={order.vendorSummary?.subtotal ?? 0}
            />
          );
        })}
      </div>
    </>
  );
}
