import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { CheckCircle, CheckCircle2, Clock, Mail } from 'lucide-react';

export default function TicketSuccessDetails({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={onClose}>
        <section className=" space-y-12">
          <div className="flex flex-col justify-center text-center items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-[#10B981]/10 text-[#10B981] flex justify-center items-center shrink-0 aspect-square">
              <CheckCircle2 size={64} />
            </div>

            <div className="space-y-2">
              <p>Issue Reported Successfully</p>
              <p className="text-sm text-neutral-500">
                Your complaint has been submitted with care
              </p>
            </div>

            <Card gap="sm" className="bg-foreground-200 text-sm w-full">
              <p className="text-sm text-neutral-500">Ticket ID</p>
              <p className="font-medium text-primary">CRT-057637-353</p>
            </Card>
          </div>

          <ul className="text-left w-full space-y-8 text-sm">
            <li className="flex items-start gap-4">
              <Clock size={20} className="text-primary" />

              <div className="space-y-3">
                <p>Expected Response Time</p>

                <p className="text-sm text-neutral-500">
                  Within 2-4 hours during business hours
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <Mail size={20} className="text-[#10B981]" />

              <div className="space-y-3">
                <p>Email Confirmation</p>

                <p className="text-sm text-neutral-500">
                  Sent to your registered email address
                </p>
              </div>
            </li>
          </ul>

          <div className="flex justify-center items-center">
            <Button onClick={onClose} size="2xl">
              Got it, thanks!
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
}
