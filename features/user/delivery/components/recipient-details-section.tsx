import Card from '@/components/layout/card';
import Input from '@/components/ui/inputs/input';
interface Props {
  name: string;
  phone: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}
export default function RecipientDetailsSection({
  name,
  phone,
  onNameChange,
  onPhoneChange,
}: Props) {
  return (
    <Card border='none' className="bg-foreground-200 rounded-2xl p-5">
      {' '}
      <div className="space-y-5">
        {' '}
        <div>
          {' '}
          <h2 className="font-semibold text-base"> Recipient Details </h2>{' '}
          <p className="text-sm text-neutral-500 mt-1">
            {' '}
            Who will receive this order?{' '}
          </p>{' '}
        </div>{' '}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {' '}
          <Input
            label="Recipient Name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />{' '}
          <Input
            label="Recipient Phone"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
          />{' '}
        </div>{' '}
      </div>{' '}
    </Card>
  );
}
