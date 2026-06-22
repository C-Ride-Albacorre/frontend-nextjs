import Card from '@/components/layout/card';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons/button';
import Header from '@/components/ui/headers/user-route-header';
import { Calendar, Edit, Image, Loader, Mail, Phone } from 'lucide-react';
import { profileService } from '@/features/user/profile/service';
import ProfileSettings from '@/features/user/profile/components/profile-settings';
import SavedAddress from '@/features/user/profile/components/saved-address';
import DeleteAccountButton from '@/features/user/profile/components/delete-account';
import Logout from '@/features/auth/components/logout/logout';
import { Suspense } from 'react';
import ProfileAddressWrapper from '@/features/user/profile/components/saved-address-wrapper';
import ProfileWrapper from '@/features/user/profile/components/profile-wrapper';

export default async function UserProfilePage() {
  return (
    <>
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <Header />

        <Suspense
          fallback={
            <div className="h-72 bg-foreground-200 animate-pulse w-full flex justify-center items-center">
              <Loader size={24} className="animate-spin text-primary" />
            </div>
          }
        >
          <ProfileWrapper />
        </Suspense>

        <Suspense
          fallback={
            <div className="h-72 bg-foreground-200 animate-pulse w-full flex justify-center items-center">
              <Loader size={24} className="animate-spin text-primary" />
            </div>
          }
        >
          <ProfileAddressWrapper />
        </Suspense>
        <ProfileSettings />

        <section className="flex flex-col md:flex-row gap-4 justify-center  md:gap-6">
          <Logout />
          <Button variant="primary-black-outline" size="lg">
            Back to Portal Selection
          </Button>

          <DeleteAccountButton />
        </section>
      </main>
    </>
  );
}
