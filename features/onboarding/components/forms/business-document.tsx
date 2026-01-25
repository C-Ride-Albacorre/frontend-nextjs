'use client';

import { useState } from 'react';

import { FileText } from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import ButtonProceed from '@/components/ui/buttons/button-proceed';
import ButtonPrevious from '@/components/ui/buttons/button-previous';
import FileInput from '@/components/ui/inputs/fileInput';
import SuccessModal from '../success-modal';

export default function BusinessDocumentForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="space-y-12">
      <OnboardingFormHeader
        title="Business Document"
        subtitle="Upload required documents for verification"
        headerIcon={<FileText size={24} className="text-primary" />}
      />

      <form action="" className="space-y-6">
        <FileInput
          isUploaded={false}
          title="CAC Certificate "
          subtitle="Corporate Affairs Commission"
          value=""
          // handleUpload={() => {}}
        />

        <FileInput
          isUploaded={false}
          title="Business Permit"
          subtitle="Operating license"
          value=""
          // handleUpload={() => {}}
        />

        <FileInput
          isUploaded={false}
          title="Valid ID"
          subtitle="Owner’s government-issued ID"
          value=""
          // handleUpload={() => {}}
        />

        <div className="mt-4 p-4 md:p-6 bg-primary/10 rounded-xl text-primary-text-100 ">
          <p className=" text-xs md:text-sm">
            All documents will be securely stored and reviewed by our
            verification team. This typically takes 24-48 hours.
          </p>
        </div>

        <div className="mt-12  flex items-center justify-between lg:justify-around">
          <ButtonPrevious
            href="/onboarding/business-bank"
            buttonText="Previous"
          />

          <button
            className="px-3 py-3  lg:px-8 lg:py-4 bg-primary hover:bg-primary-hover rounded-xl font-medium text-sm  cursor-pointer flex gap-1 md:gap-4 items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            Proceed
          </button>
        </div>
      </form>

      <SuccessModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
