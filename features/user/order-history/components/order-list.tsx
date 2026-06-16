'use client';

import { Order } from '../types';
// import { orders } from '../data';
// import { orders } from "../data";
import OrderCard from './order-card';

export default function OrderList({ orders }: { orders: Order[] }) {
  console.log('Received orders in OrderList:', orders);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
      {orders.map((order) => (
        <li key={order.id}>
          <OrderCard order={order} />
        </li>
      ))}
    </ul>
  );
}
