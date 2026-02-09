import { OrderBase, OrderProps } from "./type";


export const activeOrders: OrderProps[] = [
  {
    orderId: '#CR-2851',
    status: 'In Transit',
    scheduleType: 'Scheduled',
    percent: 70,
    visible: true,
    customer: 'Adebayo Williams',
    address: 'Plot 15, Adeola Odeku Street, Victoria Island, Lagos',
    distance: '3.2 km',
    fee: '₦18,500',
    driver: {
      name: 'Tunde Bakare',
      rating: 4.9,
    },
    items: [
      { name: 'Jollof Rice with Chicken', quantity: 2 },
      { name: 'Pepper Soup', quantity: 2 },
    ],
    timeline: [
      { label: 'Prepared', time: '2:05 PM' },
      { label: 'Picked up', time: '2:15 PM' },
      { label: 'Slot', time: '2:30 PM - 3:00 PM' },
    ],
  },
];

