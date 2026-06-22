import { Button } from '@/components/ui/buttons/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
interface Props {
  id: string;
  slug: string;
  onProceed: () => void;
}
export default function DeliveryFooter({ id, slug, onProceed }: Props) {
  return (
    <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
      {' '}
      <Button
        href={`/user/delivery/${id}/${slug}/delivery-type`}
        variant="outline"
        leftIcon={<ChevronLeft size={16} />}
      >
      
        Back
      </Button>
      <Button onClick={onProceed} rightIcon={<ChevronRight size={16} />}>
        {' '}
        Proceed{' '}
      </Button>{' '}
    </div>
  );
}
