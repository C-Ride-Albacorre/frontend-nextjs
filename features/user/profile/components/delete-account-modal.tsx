import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import Input from '@/components/ui/inputs/input';
import { Shield, Trash, Trash2, TriangleAlert } from 'lucide-react';
import Image from 'next/image';
import { title } from 'process';

const toBeDeleted = [
  {
    title: 'All Order History',
    description:
      'All your past and active deliveries will be permanently deleted',
    icon: Trash2,
  },
  {
    title: 'Saved Addresses & Payment Methods',
    description: 'All your saved information will be removed from our system',
    icon: Trash2,
  },
  {
    title: 'Loyalty Points & Rewards',
    description: 'All accumulated points and tier benefits will be forfeited',
    icon: Trash2,
  },
  {
    title: 'Wallet Balance',
    description: 'Any remaining wallet balance will be lost',
    icon: Trash2,
  },
];

export default function DeleteAccountModal({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={onClose}>
        <section className='space-y-12'>
          <section className="space-y-8">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <div className="flex justify-center items-center w-12 h-12 shrink-0 aspect-square bg-[#EF4444]/10 text-[#EF4444] rounded-full">
                <TriangleAlert size={20} />
              </div>

              <h2 className=" text-lg md:text-xl font-semibold">
                Delete Account
              </h2>
            </div>

            <Card className="bg-[#EF4444]/10 ">
              <div className="text-sm space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
                  <Image
                    src="/assets/image/caution.webp"
                    alt="caution"
                    width={16}
                    height={16}
                    priority
                  />{' '}
                  <p> This action is permanent and cannot be undone</p>
                </div>

                <p className=" text-neutral-500">
                  Deleting your account will permanently remove all your data,
                  including:
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              {toBeDeleted.map((item, index) => (
                <Card
                  key={index}
                  border="none"
                  className="bg-foreground-100 flex items-start gap-4"
                >
                  <div className="bg-[#EF4444]/10 w-8 h-8 flex items-center justify-center rounded-full aspect-square shrink-0 mb-0 ">
                    <item.icon className="text-[#EF4444]" size={14} />
                  </div>

                  <div className="space-y-2 mb-0">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-sm text-neutral-500">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <Card
              border="none"
              className="bg-foreground-100 flex  flex-col md:flex-row  items-start gap-4"
            >
              <div className="bg-[#D4AF37]/10 w-8 h-8 flex items-center justify-center rounded-full aspect-square shrink-0 mb-0 ">
                <Shield className="text-[#D4AF37]" size={14} />
              </div>

              <div className="space-y-2 mb-0">
                <p className="font-medium text-sm">Data Privacy</p>
                <p className="text-sm text-neutral-500">
                  For security compliance, some transaction records may be
                  retained for legal purposes as outlined in our Privacy Policy.
                </p>
              </div>
            </Card>
          </section>

          <form className="text-sm space-y-6">
            <div>
              <p>
                To confirm, type{' '}
                <span className="text-[#DD1515]">“Delete my account”</span>{' '}
                below:
              </p>
              <Input placeholder="Delete my account" />
            </div>

            <div className="flex items-center justify-center gap-4 md:gap-8">
              <Button variant="primary" size="lg">
                Cancel
              </Button>

              <Button leftIcon={<Trash2 size={20} />} variant="red" size="lg">
                Delete Account Now
              </Button>
            </div>
          </form>
        </section>
      </Modal>
    </>
  );
}
