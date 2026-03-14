import Card from '@/components/layout/card';
import VendorRow from './vendors-row';

type Props = {
  status: string;
};

const vendors = [
  {
    name: 'Lagos Gourmet Kitchen',
    code: 'NVD–001',
    owner: 'Adebayo Williams',
    location: 'Ikoyi, Lagos',
    email: 'info@lagosgourmet.ng',
    business: 'Restaurant',
    rc: 'RC–1234567',
    status: 'Pending',
    logo: '/assets/image/placeholder.png',
  },
  {
    name: 'Healthy Bites Cake',
    code: 'NVD–002',
    owner: 'Adebayo Williams',
    location: 'Ikoyi, Lagos',
    email: 'contact@healthybites.com',
    business: 'Cafe & Bakery',
    rc: 'RC–1234567',
    status: 'Pending',
    logo: '/assets/image/placeholder.png',
  },
];

export default function VendorsTable({ status }: Props) {
  return (
    <Card spacing="none" className="bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-neutral-50 font-medium">
          <tr className="text-left text-neutral-600 font-medium">
            <th className="px-6 py-4">Vendor</th>
            <th className="px-6 py-4">Owner</th>
            <th className="px-6 py-4">Contact</th>
            <th className="px-6 py-4">Business Type</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((vendor, index) => (
            <VendorRow key={index} vendor={vendor} />
          ))}
        </tbody>
      </table>
    </Card>
  );
}
