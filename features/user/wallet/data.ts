

export const MOCK_DATA = {
  week: {
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
  },

  month: {
    transactions: [...Array(8)].map((_, i) => ({
      id: i,
      type: 'credit',
      title: `Order Payment - CRD-2024-${5600 + i}`,
      date: 'Nov 2025',
      commission: '₦950',
      amount: '+₦8,200',
      status: 'completed',
    })),
  },

  year: {
    transactions: [...Array(12)].map((_, i) => ({
      id: i,
      type: 'credit',
      title: `Order Payment - 2025-${i + 1}`,
      date: '2025',
      commission: '₦1,200',
      amount: '+₦10,500',
      status: 'completed',
    })),
  },
};
