'use client'
import { useState } from 'react';

import { Button } from '@/components/ui/buttons/button';
import DeleteAccountModal from './delete-account-modal';


export default function DeleteAccountButton() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsDeleteModalOpen(true)}
        variant="red-outline"
        size="lg"
      >
        Delete Account
      </Button>

      <DeleteAccountModal
        isModalOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
