'use client';

import { useState, useTransition } from 'react';
import { ChevronLeft, ChevronRight, FileText, InfoIcon } from 'lucide-react';
import { toast } from 'sonner';
import OnboardingFormHeader from '../form-header';
import FileInput from '@/components/ui/inputs/file-input';
import SuccessModal from '../success-modal';
import { Button } from '@/components/ui/buttons/button';
import { submitOnboardingService } from '../../service/upload-submit';
import { useOnboardingStore, useOnboardingHydrated } from '../../store';

type UploadStatus = 'idle' | 'done';

type DocumentSlot = {
  documentType: string;
  description: string;
  label: string;
  file: File | null;
  status: UploadStatus;
};

// const DOCUMENT_SLOTS: DocumentSlot[] = [
//   {
//     documentType: 'CAC',
//     description: 'CAC certificate',
//     label: 'CAC Certificate',
//     file: null,
//     status: 'idle',
//   },
//   {
//     documentType: 'BUSINESS_PERMIT',
//     description: 'Operating license',
//     label: 'Business Permit',
//     file: null,
//     status: 'idle',
//   },
//   {
//     documentType: 'ID_PROOF',
//     description: "Owner's government-issued ID",
//     label: 'Valid ID',
//     file: null,
//     status: 'idle',
//   },
// ];

export default function BusinessDocumentForm() {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hydrated = useOnboardingHydrated();

  const { documents, setDocuments, resetAll } = useOnboardingStore();

  function handleFileSelect(index: number, file: File) {
    const updated = documents.map((doc, i) =>
      i === index ? { ...doc, file, status: 'done' as const } : doc,
    );

    setDocuments(updated);
  }
  function handleSubmit() {
    const selectedDocs = documents.filter((doc) => doc.file);

    if (selectedDocs.length === 0) {
      toast.error('Please select at least one document.');
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();

        documents.forEach((doc) => {
          if (doc.file) {
            formData.append('documents', doc.file);
          }
        });

        formData.append(
          'documentsMetadata',
          JSON.stringify(
            documents
              .filter((d) => d.file)
              .map((doc) => ({
                documentType: doc.documentType,
                description: doc.description,
              })),
          ),
        );

        await submitOnboardingService(formData);

        toast.success('Onboarding submitted successfully!');

        resetAll(); // 🔥 CLEAR EVERYTHING

        setIsModalOpen(true);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Failed to submit onboarding.',
        );
      }
    });
  }

  const allSelected = documents.every((doc) => doc.file !== null);

  if (!hydrated) {
    return (
      <section className="space-y-12">
        <OnboardingFormHeader
          title="Business Document"
          subtitle="Upload required documents for verification"
          headerIcon={<FileText size={24} className="text-primary" />}
        />
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-12">
      <OnboardingFormHeader
        title="Business Document"
        subtitle="Upload required documents for verification"
        headerIcon={<FileText size={24} className="text-primary" />}
      />

      <div className="space-y-6">
        {documents.map((doc, index) => (
          <FileInput
            key={doc.documentType}
            mode="upload"
            title={doc.label}
            description={doc.description}
            uploadStatus={doc.status}
            onFileSelect={(file) => handleFileSelect(index, file)}
          />
        ))}

        <div className="mt-4 p-4 md:p-6 bg-primary/10 rounded-xl text-primary-text-100 flex items-start gap-2">
          <InfoIcon className="text-primary h-5 w-5 lg:h-4 lg:w-4 shrink-0" />
          <p className="text-xs md:text-sm">
            All documents will be securely stored and reviewed by our
            verification team. This typically takes 24-48 hours.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-between lg:justify-around">
          <Button
            href="/onboarding/business-bank"
            variant="outline"
            size="lg"
            leftIcon={<ChevronLeft size={16} />}
          >
            Previous
          </Button>

          <Button
            type="button"
            variant="primary"
            size="lg"
            loading={isPending}
            disabled={isPending || !allSelected}
            onClick={handleSubmit}
            rightIcon={<ChevronRight size={16} />}
          >
            {isPending ? 'Submitting...' : 'Proceed'}
          </Button>
        </div>
      </div>

      <SuccessModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
