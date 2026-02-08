import { Period } from './type';

export const MOCK_DATA: Record<Period, any> = {
  week: {
    stats: {
      totalEarnings: '₦285,000.00',
      deliveries: 89,
      avgOrderValue: '₦3,202',
      commissionPaid: '4.8',
      trend:'+12%',
      trendType:'positive'
    },
    transactions: [
      {
        id: 1,
        type: 'credit',
        title: 'Order Payment - CRD-2024-5678',
        date: 'Nov 26, 10:30 AM',
        commission: '₦850',
        amount: '+₦7,650',
        status: 'completed',
      },
      {
        id: 2,
        type: 'debit',
        title: 'Order Payment - CRD-2024-9876',
        date: 'Nov 25, 4:10 PM',
        commission: '₦1,200',
        amount: '-₦435,650',
        status: 'pending',
      },
    ],
    commissions: [
      { range: '₦0 - ₦5,000', orders: 145, rate: '10%', value: '₦850' },
      { range: '₦5,001 - ₦20,000', orders: 52, rate: '10%', value: '₦2,300' },
    ],
    invoices: [
      {
        id: 1,
        month: 'November 2025',
        amount: '₦1,250,000.00',
        status: 'paid',
      },
    ],
  },

  month: {
    stats: {
      totalEarnings: '₦1,120,000.00',
      deliveries: 342,
      avgOrderValue: '₦3,274',
      commissionPaid: '10%',
    },
    transactions: [...Array(8)].map((_, i) => ({
      id: i,
      type: 'credit',
      title: `Order Payment - CRD-2024-${5600 + i}`,
      date: 'Nov 2025',
      commission: '₦950',
      amount: '+₦8,200',
      status: 'completed',
    })),
    commissions: [
      { range: '₦0 - ₦5,000', orders: 420, rate: '10%', value: '₦4,850' },
    ],
    invoices: [
      {
        id: 1,
        month: 'October 2025',
        amount: '₦980,000.00',
        status: 'paid',
      },
    ],
  },

  year: {
    stats: {
      totalEarnings: '₦12,850,000.00',
      deliveries: 3_942,
      avgOrderValue: '₦3,421',
      commissionPaid: '10%',
    },
    transactions: [...Array(12)].map((_, i) => ({
      id: i,
      type: 'credit',
      title: `Order Payment - 2025-${i + 1}`,
      date: '2025',
      commission: '₦1,200',
      amount: '+₦10,500',
      status: 'completed',
    })),
    commissions: [
      { range: '₦0 - ₦5,000', orders: 2_100, rate: '10%', value: '₦22,000' },
    ],
    invoices: [
      {
        id: 1,
        month: '2025 Summary',
        amount: '₦12,850,000.00',
        status: 'paid',
      },
    ],
  },
};
