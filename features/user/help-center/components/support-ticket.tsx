'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { CheckCircle2, Clock, FileText } from 'lucide-react';
import { supportTickets } from '../data';
import { useState } from 'react';
import CreateTicketModal from './create-ticket-modal';

export default function SupportTicket() {
  const [isSupportTicketModalOpen, setIsSupportTicketModalOpen] =
    useState(false);

  return (
    <>
      <section className="space-y-12">
        <Card gap="lg" className="bg-foreground-200 text-sm">
          <div className="space-y-4 text-sm">
            <p className="font-medium">Need More Help?</p>

            <p className="text-neutral-500 leading-8">
              Can't find what you're looking for? Submit a support ticket and
              our team will assist you.
            </p>
          </div>

          <Button
            onClick={() => setIsSupportTicketModalOpen(true)}
            size="full"
            leftIcon={<FileText size={16} />}
          >
            Submit Ticket
          </Button>
        </Card>

        <Card>
          <p>Your Support Tickets</p>

          <ul className="space-y-6">
            {supportTickets.map((ticket) => (
              <li key={ticket.id}>
                <Card gap="sm" className="bg-foreground-200 text-sm">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-neutral-500">{ticket.id}</p>

                    <span
                      className={`px-2 py-1.5 text-[10px] ${ticket.status === 'Resolved' ? 'bg-[#10B981]' : 'bg-[#D4AF37]'} text-white rounded-full flex justify-center items-center gap-1 w-max`}
                    >
                      {ticket.status === 'Resolved' && (
                        <CheckCircle2 size={14} />
                      )}
                      {ticket.status === 'Pending' && <Clock size={14} />}
                      {ticket.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p>{ticket.subject}</p>
                    <p className="text-xs text-neutral-500">{ticket.date}</p>
                  </div>

                  {ticket.resolution && (
                    <p className="text-[#10B981] leading-6 text-xs">
                      {ticket.resolution}
                    </p>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <CreateTicketModal
        isModalOpen={isSupportTicketModalOpen}
        onClose={() => setIsSupportTicketModalOpen(false)}
      />
    </>
  );
}
