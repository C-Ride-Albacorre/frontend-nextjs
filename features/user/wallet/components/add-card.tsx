import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function AddCard() {
  return (
    <Card>
      <div className="flex justify-between items-center">
        <p>Saved Cards</p>

        <Button size="icon" leftIcon={<Plus size={14} />} variant="primary">
          Add Card
        </Button>
      </div>

      <ul className="space-y-6">
        <li>
          <Card className="flex flex-col sm:flex-row gap-6 justify-between md:items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-0">
              <div className="bg-primary/10 w-12 h-12 flex justify-center items-center aspect-square shrink-0 rounded-full">
                <CreditCard size={20} />
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <p>•••• •••• •••• 4242</p>

                  <span className="bg-[#10B981] text-white text-[10px] px-2 py-1 rounded-full">
                    Default
                  </span>
                </div>

                <p className="text-neutral-400 text-sm">Expires 12/25</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <IconButton rounded="md" variant="red">
                <Trash2 size={16} />
              </IconButton>
            </div>
          </Card>
        </li>

        <li>
          <Card className="flex flex-col sm:flex-row gap-6 justify-between md:items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-0">
              <div className="bg-primary/10 w-12 h-12 flex justify-center items-center aspect-square shrink-0 rounded-full">
                <CreditCard size={20} />
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <p>•••• •••• •••• 4242</p>
                </div>

                <p className="text-neutral-400 text-sm">Expires 12/25</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="xs" variant="green-outline">
                Set as Default
              </Button>

              <IconButton rounded="md" variant="red">
                <Trash2 size={16} />
              </IconButton>
            </div>
          </Card>
        </li>
      </ul>

      <div className="flex items-center  md:items-start gap-2 text-sm text-neutral-500 ">
        <Image
          src="/assets/image/credit-card.jpg"
          alt="Credit Card"
          width={32}
            height={32}
          priority
        />

        <p className='my-0'>
          We accept Visa, Mastercard, and Verve. All transactions are secured
          via Paystack & Flutterwave.
        </p>
      </div>
    </Card>
  );
}
