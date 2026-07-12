import Card from '@/components/layout/card';
import { Loader } from 'lucide-react';

export default function StoreCatalogueSkeleton() {
  return (
    <Card border="none">
      <div className="flex items-center justify-center py-20">
        <Loader size={24} className="animate-spin text-primary" />
      </div>
    </Card>
  );
}
