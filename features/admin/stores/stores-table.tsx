import Card from '@/components/layout/card';
import StoreRow from './stores-row';

type Props = {
  status: string;
};

const stores = [
  {
    name: 'Lagos Gourmet Kitchen',
    code: 'STR–001',
    owner: 'Adebayo Williams',
    location: 'Ikoyi, Lagos',
    email: 'info@lagosgourmet.ng',
    category: 'Restaurant',
    rc: 'RC–1234567',
    status: 'Active',
    logo: '/assets/image/placeholder.png',
  },
  {
    name: 'Healthy Bites Cake',
    code: 'STR–002',
    owner: 'Chinwe Okafor',
    location: 'Lekki, Lagos',
    email: 'contact@healthybites.com',
    category: 'Cafe & Bakery',
    rc: 'RC–7654321',
    status: 'Active',
    logo: '/assets/image/placeholder.png',
  },
  {
    name: 'QuickMart Express',
    code: 'STR–003',
    owner: 'Emeka Nwankwo',
    location: 'Victoria Island, Lagos',
    email: 'hello@quickmart.ng',
    category: 'Retail',
    rc: 'RC–9876543',
    status: 'Suspended',
    logo: '/assets/image/placeholder.png',
  },
];

export default function StoresTable({ status }: Props) {
  return (
    <Card spacing="none" className="bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-neutral-50 font-medium">
          <tr className="text-left text-neutral-600 font-medium">
            <th className="px-6 py-4">Store</th>
            <th className="px-6 py-4">Owner</th>
            <th className="px-6 py-4">Contact</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store, index) => (
            <StoreRow key={index} store={store} />
          ))}
        </tbody>
      </table>
    </Card>
  );
}
