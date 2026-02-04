import { Order } from './type';

export const activeOrders: Order[] = [
  {
    orderId: '#CR-2851',
    status: 'In Transit',
    scheduleType: 'Scheduled',
    percent: 70,
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
  {
    orderId: '#CR-2852',
    status: 'In Transit',
    scheduleType: 'Scheduled',
    percent: 45,
    customer: 'Funke Adebola',
    address: 'Lekki Phase 1, Lagos',
    distance: '5.1 km',
    fee: '₦22,000',
    driver: {
      name: 'Sadiq Musa',
      rating: 4.7,
    },
    items: [{ name: 'Ofada Rice', quantity: 1 }],
    timeline: [
      { label: 'Prepared', time: '1:40 PM' },
      { label: 'Picked up', time: '1:55 PM' },
      { label: 'Slot', time: '2:30 PM - 3:00 PM' },
    ],
  },
];
