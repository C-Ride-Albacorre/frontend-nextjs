'use client';
import { use, useState } from 'react';

import Card from '@/components/layout/card';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import Header from '@/components/ui/headers/user-route-header';
import {
  Briefcase,
  Calendar,
  Edit,
  Home,
  Image,
  Mail,
  MapPin,
  Phone,
  Trash2,
} from 'lucide-react';
import AddressModal from '@/features/user/address/components/address-modal';
import DeleteAccountModal from '@/features/user/profile/components/delete-account-modal';

const addressOptions = [
  {
    label: 'Home',
    default: true,
    icon: <Home size={20} className="text-primary" />,
    address: '1234 Elm Street, Mainland ',
    location: 'Lagos, Nigeria',
  },
  {
    label: 'Work',
    icon: <Briefcase size={20} className="text-primary" />,
    address: '5678 Oak Avenue, Victoria Island',
    location: 'Lagos, Nigeria',
  },
  {
    label: 'Parents',
    icon: <MapPin size={20} className="text-primary" />,
    address: '9101 Pine Road, Lekki Phase 1',
    location: 'Lagos, Nigeria',
  },
];

export default function UserProfilePage() {
  const [addLocation, setAddLocation] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(false);

  const [smsNotifications, setSmsNotifications] = useState(false);

  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <>
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <Header />

        <Card gap="lg">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Personal Information</p>

            <Button
              variant="outline"
              size="icon"
              className="bg-white"
              leftIcon={<Edit size={16} />}
            >
              Edit Profile
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Avatar
              src="/assets/image/driver.jpg"
              alt="driver"
              name="Chukwudi Okonkwo"
              size={100}
            />

            <div className="space-y-4">
              <p className="font-medium text-lg">Chukwudi Okonkwo</p>

              <Button
                size="icon"
                variant="outline"
                leftIcon={<Image size={16} />}
                className="border-none"
              >
                Change Photo
              </Button>
            </div>
          </div>

          <Card className="bg-foreground-200">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-sm">
              <li className="space-y-4">
                <p className="font-medium">Other Names</p>
                <p className="text-neutral-500">Abimbola Janet</p>
              </li>

              <li className="space-y-4">
                <p className="font-medium">Last Name</p>
                <p className="text-neutral-500">Adewale </p>
              </li>

              <li className="space-y-4">
                <p className="font-medium">Email Address</p>
                <p className="text-neutral-500 flex items-center gap-2">
                  <Mail size={16} />
                  adewale.johnson@email.com
                </p>
              </li>

              <li className="space-y-4">
                <p className="font-medium">Phone Number</p>
                <p className="text-neutral-500 flex items-center gap-2">
                  <Phone size={16} /> +234 803 456 7890
                </p>
              </li>

              <li className="space-y-4">
                <p className="font-medium">Date of Birth</p>
                <p className="text-neutral-500 flex items-center gap-2">
                  <Calendar size={16} />
                  11th Jan 1980
                </p>
              </li>
            </ul>
          </Card>
        </Card>

        <Card gap="lg">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Saved Address</p>

            <Button
              onClick={() => setAddLocation(true)}
              variant="primary"
              size="icon"
              leftIcon={<MapPin size={16} />}
            >
              Add Location
            </Button>
          </div>

          <ul className="space-y-6">
            {addressOptions.map((option, index) => (
              <li key={index}>
                <Card
                  gap="none"
                  className="bg-foreground-100 flex flex-col md:flex-row gap-8 items-start justify-between"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex justify-center items-center">
                      {option.icon}
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <p className="text-sm">{option.label}</p>

                        {option.default && (
                          <span className="bg-[#10B981] px-2 py-1.5 text-white rounded-full text-[10px]">
                            default
                          </span>
                        )}
                      </div>

                      <p className="text-neutral-500">{option.address}</p>

                      <p className="text-neutral-500">{option.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    {!option.default && (
                      <Button
                        variant="green-outline"
                        className="text-xs"
                        size="xs"
                      >
                        Set Default
                      </Button>
                    )}
                    <IconButton
                      variant="default"
                      size="sm"
                      rounded="md"
                      className="bg-white"
                      aria-label="Edit Address"
                    >
                      <Edit size={16} />
                    </IconButton>

                    <IconButton
                      size="sm"
                      rounded="md"
                      variant="red"
                      aria-label="Delete Address"
                    >
                      <Trash2 size={14} />
                    </IconButton>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Card>

        <Card gap="lg">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Account Settings</p>

            <Button
              variant="outline"
              size="icon"
              className="bg-white"
              leftIcon={<Edit size={16} />}
            >
              Edit Settings
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="bg-foreground-200 flex items-center justify-between gap-4">
              <div className="space-y-4 text-sm mb-0">
                <p>Email Notifications</p>

                <p className="text-neutral-500 flex-wrap">
                  Receive updates about your orders
                </p>
              </div>

              <div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                    emailNotifications ? 'bg-[#10B981]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                      emailNotifications ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </Card>

            <Card className="bg-foreground-200 flex items-center justify-between gap-4">
              <div className="space-y-4 text-sm mb-0">
                <p>SMS Notifications</p>

                <p className="text-neutral-500 flex-wrap">
                  Get SMS alerts for deliveries
                </p>
              </div>

              <div>
                <button
                  onClick={() => setSmsNotifications(!smsNotifications)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                    smsNotifications ? 'bg-[#10B981]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                      smsNotifications ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </Card>

            <Card className="bg-foreground-200 flex items-center justify-between gap-4">
              <div className="space-y-4 text-sm mb-0">
                <p>Promotional Updates</p>

                <p className="text-neutral-500 flex-wrap">
                  Receive special offers and deals
                </p>
              </div>

              <div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                    pushNotifications ? 'bg-[#10B981]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                      pushNotifications ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </Card>
          </div>
        </Card>

        <section className="flex flex-col md:flex-row gap-4 justify-center  md:gap-6">
          <Button variant="primary-black-outline" size="lg">
            Logout from Account
          </Button>

          <Button variant="primary-black-outline" size="lg">
            Back to Portal Selection
          </Button>

          <Button
            onClick={() => setIsDeleteModalOpen(true)}
            variant="red-outline"
            size="lg"
          >
            Delete Account
          </Button>
        </section>
      </main>

      <AddressModal
        isModalOpen={addLocation}
        onClose={() => setAddLocation(false)}
      />
      <DeleteAccountModal
        isModalOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
