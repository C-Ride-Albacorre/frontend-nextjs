import Card from '@/components/layout/card';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons/button';
import Header from '@/components/ui/headers/user-route-header';
import { Calendar, Edit, Image, Mail, Phone } from 'lucide-react';
import { profileService } from '@/features/user/profile/service';
import ProfileSettings from '@/features/user/profile/components/profile-settings';
import SavedAddress from '@/features/user/profile/components/saved-address';
import DeleteAccountButton from '@/features/user/profile/components/delete-account';
import Logout from '@/features/auth/components/logout/logout';

export default async function UserProfilePage() {
  let data;

  const result = await profileService();

  data = result.data;

  console.log('Profile Data:', data);

  if (!result.data) {
    return <div>Failed to load profile</div>;
  }

  const firstName = data?.firstName?.toLowerCase();
  const lastName = data?.lastName?.toLowerCase();
  const fullName = `${firstName} ${lastName}`;
  const email = data?.email?.toLowerCase();
  const phone = data?.phone;

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
            <Avatar src="" alt="driver" name={fullName} size={100} />

            <div className="space-y-4">
              <p className="font-medium text-lg capitalize">{fullName}</p>

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
                <p className="font-medium">First Name</p>
                <p className="text-neutral-600 capitalize">{firstName}</p>
              </li>

              <li className="space-y-4">
                <p className="font-medium">Last Name</p>
                <p className="text-neutral-600 capitalize">{lastName}</p>
              </li>

              {email && (
                <li className="space-y-4">
                  <p className="font-medium">Email Address</p>
                  <p className="text-neutral-600 flex items-center gap-2">
                    <Mail size={16} />
                    {email ? email : null}
                  </p>
                </li>
              )}

              {phone && (
                <li className="space-y-4">
                  <p className="font-medium">Phone Number</p>
                  <p className="text-neutral-600 flex items-center gap-2">
                    <Phone size={16} /> {phone ? phone : null}
                  </p>
                </li>
              )}

              <li className="space-y-4">
                <p className="font-medium">Date of Birth</p>
                <p className="text-neutral-600 flex items-center gap-2">
                  <Calendar size={16} />
                </p>
              </li>
            </ul>
          </Card>
        </Card>

        <SavedAddress />
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
