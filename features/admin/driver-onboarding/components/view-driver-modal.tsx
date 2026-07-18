'use client';

import { useState } from 'react';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import {
  LoaderCircle,
  Car,
  User,
  UserRound,
  Navigation,
  Navigation2,
  Locate,
  Home,
  MapPin,
  MessageCircle,
  Mail,
  Phone,
  CarFront,
  FileText,
  Bandage,
  Info,
} from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

import { statusStyles } from '../data';
import { formatStatus, REVIEWABLE_STATUSES } from '../helpers';
import { ViewDriverModalProps } from '../types';
import Card from '@/components/layout/card';
import DriverActionModal from './driver-action';

export default function ViewDriverModal({
  isModalOpen,
  setIsModalOpen,
  driver,
  isLoading,
}: ViewDriverModalProps) {
  const [submitAction, setSubmitAction] = useState<
    'ACTIVE' | 'REJECTED' | null
  >(null);
  const [isModalActionOpen, setIsModalActionOpen] = useState(false);

  console.log(' Driver details in modal:', driver);

  const isPending = driver
    ? REVIEWABLE_STATUSES.includes(driver.status)
    : false;


  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleAction = async (action: 'ACTIVE' | 'REJECTED') => {
    setIsModalActionOpen(true);
    setSubmitAction(action);

  };

  const handleSuccess = () => {
    setSubmitAction(null);
    setIsModalActionOpen(false);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setSubmitAction(null);
    setIsModalActionOpen(false);
  };



  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={handleClose}>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoaderCircle className="animate-spin text-primary" size={32} />
          </div>
        ) : driver ? (
          <div className="space-y-6 py-4">
            {/* Profile Picture */}
            <div className="relative w-full h-64 md:w-64 rounded-xl overflow-hidden bg-neutral-100">
              {driver.profilePicture ? (
                <Image
                  src={driver.profilePicture}
                  alt={driver.firstName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car size={40} className="text-neutral-300" />
                </div>
              )}
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
              <div>
                <h2 className="text-xl capitalize font-semibold text-neutral-900 flex-wrap">
                  {`${driver.firstName} ${driver.lastName}`}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5 flex-wrap">
                  {driver.id}
                </p>
              </div>

              <h6
                className={clsx(
                  'rounded-full px-3 py-1 text-[10px] font-medium',
                  statusStyles[driver.status] ??
                    'bg-neutral-100 text-neutral-600',
                )}
              >
                {formatStatus(driver.status)}
              </h6>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                gap="md"
                border="none"
                className="flex items-start gap-3  bg-neutral-50"
              >
                <UserRound size={18} className="text-green-100" />

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Driver</p>
                  <p className="font-medium text-neutral-900 text-sm capitalize flex-wrap">
                    {driver.firstName} {driver.lastName}
                  </p>
                </div>
              </Card>

              <Card
                gap="md"
                border="none"
                className="flex items-start gap-3  bg-neutral-50"
              >
                <MapPin size={18} className="text-green-100 shrink-0" />

                <div>
                  <p className="text-xs text-neutral-500 mb-1">
                    Address Information
                  </p>
                  <div className="font-medium text-neutral-900 flex-wrap text-sm">
                    {driver.driverProfile && (
                      <div className="text-sm">
                        <span>{driver.driverProfile.address}</span>
                        <span>, {driver.driverProfile.city}</span>
                        <span>, {driver.driverProfile.state}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card
                gap="md"
                border="none"
                className="flex items-start gap-3  bg-neutral-50"
              >
                <Mail size={18} className="text-green-100" />
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Email</p>
                  <p className="font-medium text-neutral-900 text-sm">
                    {driver.email}
                  </p>
                </div>
              </Card>

              <Card
                gap="md"
                border="none"
                className="flex items-start gap-3  bg-neutral-50"
              >
                <Phone size={18} className="text-green-100" />
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Phone</p>
                  <p className="font-medium text-neutral-900 text-sm">
                    {driver.phoneNumber ?? '—'}
                  </p>
                </div>
              </Card>

              {driver.driverProfile && (
                <>
                  <Card
                    gap="md"
                    border="none"
                    className="flex items-start gap-3  bg-neutral-50"
                  >
                    <Car size={18} className="text-green-100" />

                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        Vehicle Type
                      </p>
                      <p className="font-medium text-neutral-900 text-sm capitalize">
                        {driver.driverProfile.vehicleType?.toLocaleLowerCase()}
                      </p>
                    </div>
                  </Card>

                  <Card
                    gap="md"
                    border="none"
                    className="flex items-start gap-3  bg-neutral-50"
                  >
                    <CarFront size={18} className="text-green-100" />

                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        Vehicle Make
                      </p>
                      <p className="font-medium text-neutral-900 text-sm capitalize">
                        {driver.driverProfile.vehicleMake}
                      </p>
                    </div>
                  </Card>

                  <Card
                    gap="md"
                    border="none"
                    className="flex items-start gap-3  bg-neutral-50"
                  >
                    <FileText size={18} className="text-green-100" />

                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        Vehicle Model
                      </p>
                      <p className="font-medium text-neutral-900 text-sm capitalize">
                        {driver.driverProfile.vehicleModel}
                      </p>
                    </div>
                  </Card>

                  <Card
                    gap="md"
                    border="none"
                    className="flex items-start gap-3  bg-neutral-50"
                  >
                    <Bandage size={18} className="text-green-100" />

                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        License Plate
                      </p>
                      <p className="font-medium text-neutral-900 text-sm uppercase">
                        {driver.driverProfile.licensePlate}
                      </p>
                    </div>
                  </Card>

                  <Card
                    gap="md"
                    border="none"
                    className=" bg-neutral-50 col-span-2 flex items-start gap-3"
                  >
                    <Info size={18} className="text-green-100" />

                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Status</p>
                      <h6
                        className={clsx(
                          'rounded-full px-3 py-1 text-[10px] font-medium',
                          statusStyles[driver.driverProfile.status] ??
                            'bg-neutral-100 text-neutral-600',
                        )}
                      >
                        {formatStatus(driver.driverProfile.status)}
                      </h6>
                    </div>
                  </Card>
                </>
              )}
            </div>

            {/* Documents */}
            <div className="space-y-3">
              <h6 className="text-sm font-semibold">Documents</h6>

              {driver.documents && driver.documents.length > 0 ? (
                <ul className="space-y-2">
                  {driver.documents.map((document) => {
                    const url = document.documentUrl;
                    const isImage =
                      /\.(jpg|jpeg|png|webp|avif|gif)(\?|$)/i.test(url);
                    const isPdf = /\.pdf(\?|$)/i.test(url);

                    return (
                      <li
                        key={document.id}
                        className="rounded-xl border border-neutral-100 overflow-hidden"
                      >
                        {/* Header row */}
                        <div className="p-3 bg-neutral-50 flex justify-between items-center">
                          <p className="text-sm font-medium text-neutral-800">
                            {document.documentType.replace(/_/g, ' ')}
                          </p>
                          <div className="flex items-center gap-2">
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary font-medium hover:underline"
                            >
                              Open
                            </a>

                            <a
                              href={url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-neutral-500 hover:text-neutral-700 font-medium hover:underline"
                            >
                              Download
                            </a>
                          </div>
                        </div>

                        {/* Preview — images only */}
                        {isImage && (
                          <div className="relative w-full h-40 bg-neutral-100">
                            <Image
                              src={url}
                              alt={document.documentType}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                        )}

                        {/* PDF indicator */}
                        {isPdf && (
                          <div className="px-3 py-2 bg-white flex items-center gap-2 text-xs text-neutral-400">
                            <span>📄</span>
                            <span>PDF document — click Open to view</span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-neutral-400">No documents yet</p>
              )}
            </div>

            {/* Actions */}
            {isPending && (
              <div className="pt-4 space-y-4">
           
                  <div className="flex justify-around gap-4">
                    <Button
                      variant="red-secondary"
                      size="lg"
                      onClick={ () => handleAction('REJECTED')}
                  
                    >
                      Decline
                    </Button>
                    <Button
                      variant="green-secondary"
                      size="lg"
                      onClick={() => handleAction('ACTIVE')}
                    >
                     Approve
                    </Button>
                  </div>
                </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center text-neutral-400">
            Failed to load driver details
          </div>
        )}
      </Modal>

      <DriverActionModal
        driverId={driver?.id}
        driverName={`${driver?.firstName} ${driver?.lastName}`}
        isModalOpen={isModalActionOpen}
        onClose={handleCloseModal}
        actionStatus={submitAction}
        onSuccess={handleSuccess}
      />
    </>
  );
}
