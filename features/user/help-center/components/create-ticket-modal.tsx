'use client';

import { useState } from 'react';
import Modal from '@/components/layout/modal';
import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import Textarea from '@/components/ui/inputs/textarea';
import { Button } from '@/components/ui/buttons/button';
import { Send } from 'lucide-react';

const Categories = [
  {
    label: 'Account Issues',
    value: 'account-issues',
  },
  {
    label: 'Payment Problems',
    value: 'payment-problems',
  },
  {
    label: 'Other',
    value: 'other',
  },
];
export default function CreateTicketModal({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: () => void;
}) {
  const [category, setCategory] = useState('Select Category');
  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={onClose}>
        <form className="space-y-6">
          <p>New Support Ticket</p>

          <div className="space-y-6">
            <Select
              id="category"
              label="category"
              placeholder="Select issue type"
              options={Categories}
              onChange={(value) => setCategory(value)}
              value={category}
            />

            <Input label="Order ID (Optional)" placeholder="CRD-2024-XXXX" />

            <Input label="Subject" placeholder="Brief description" />

            <Textarea
              id="description"
              label="Description"
              placeholder="Provide details about your issue"
            />
          </div>

          <div className="flex justify-between md:justify-center items-center gap-8">
            <Button size="lg" variant="outline">
              Cancel
            </Button>

            <Button leftIcon={<Send size={18}/>} size="lg">Submit</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
