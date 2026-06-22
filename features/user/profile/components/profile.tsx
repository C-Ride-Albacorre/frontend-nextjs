import Card from '@/components/layout/card';
import Avatar from '@/components/ui/avatar';
import { Calendar, Mail, Phone } from 'lucide-react';
import { ProfileProps } from '../service';

export default function Profile({
  savedProfileData,
}: {
  savedProfileData: ProfileProps['data'];
}) {
  const firstName = savedProfileData?.firstName?.toLowerCase();
  const lastName = savedProfileData?.lastName?.toLowerCase();
  const fullName = `${firstName} ${lastName}`;
  const email = savedProfileData?.email?.toLowerCase();
  const phone = savedProfileData?.phone;

  return (
    <Card gap="lg">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Personal Information</p>

        {/* <Button
                  variant="outline"
                  size="icon"
                  className="bg-white"
                  leftIcon={<Edit size={16} />}
                >
                  Edit Profile
                </Button> */}
      </div>

      <div className="flex items-center gap-4">
        <Avatar src="" alt="driver" name={fullName} size={100} />

        <div className="space-y-4">
          <p className="font-medium text-lg capitalize">{fullName}</p>

          {/* <Button
                    size="icon"
                    variant="outline"
                    leftIcon={<Image size={16} />}
                    className="border-none"
                  >
                    Change Photo
                  </Button> */}
        </div>
      </div>

      <Card border="none" className="bg-foreground-200">
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
                <Mail size={16} className="text-green-100" />
                {email}
              </p>
            </li>
          )}

          {phone && (
            <li className="space-y-4">
              <p className="font-medium">Phone Number</p>
              <p className="text-neutral-600 flex items-center gap-2">
                <Phone size={16} className="text-green-100" /> {phone}
              </p>
            </li>
          )}
          {/* {
          <li className="space-y-4">
            <p className="font-medium">Date of Birth</p>
            <p className="text-neutral-600 flex items-center gap-2">
              <Calendar size={16} />
            </p>
          </li>} */}
        </ul>
      </Card>
    </Card>
  );
}
