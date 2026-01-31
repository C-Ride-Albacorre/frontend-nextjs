'use client';

import { useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Info,
  InfoIcon,
} from 'lucide-react';
import OnboardingFormHeader from '../form-header';
import FileInput from '@/components/ui/inputs/file-input';
import SuccessModal from '../success-modal';
import { Button } from '@/components/ui/buttons/button';

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
          mode="upload"
          title="CAC Certificate "
          description="Corporate Affairs Commission"
        
        />

        <FileInput
          mode="upload"
          title="Business Permit"
          description="Operating license"
        
        />

        <FileInput
          mode="upload"
          title="Valid ID"
          description="Owner’s government-issued ID"
        
        />

        <div className="mt-4 p-4 md:p-6 bg-primary/10 rounded-xl text-primary-text-100 flex items-start gap-2">
          <InfoIcon className=" text-primary h-5 w-5 lg:h-4 lg:w-4" />
          <p className=" text-xs md:text-sm">
            All documents will be securely stored and reviewed by our
            verification team. This typically takes 24-48 hours.
          </p>
        </div>

        <div className="mt-12  flex items-center justify-between lg:justify-around">
       

          <Button
            href="/onboarding/business-bank"
            variant="outline"
            size="lg"
            leftIcon={<ChevronLeft size={16} />}
          >
            Previous
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            variant="primary"
            size="lg"
            rightIcon={<ChevronRight size={16} />}
          >
            Proceed
          </Button>

          
        </div>
      </form>

      <SuccessModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
