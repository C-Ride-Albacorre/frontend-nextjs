import ErrorState from '@/components/layout/error-state';
import { profileService } from '../service';
import Profile from './profile';
import { User } from 'lucide-react';

export default async function ProfileWrapper() {
  try {
    const { data } = await profileService();

    const savedProfileData = data;

    console.log('[ProfileWrapper] fetched profile data:', savedProfileData);

    return <Profile savedProfileData={savedProfileData} />;
  } catch (error) {
    console.error('[ProfileWrapper] Error fetching profile data:', error);

    return (
      <ErrorState
        icon={<User size={36} className="text-orange-500" />}
        title="Failed to load profile data"
        message={
          error instanceof Error
            ? error.message
            : 'An error occurred while fetching your profile information. Please try again later.'
        }
      />
    );
  }
}
