import { BASE_URL } from '@/config/api';
import { authRequest } from '@/libs/api/auth-request';

export interface ProfileProps {
  status: string;
  statusCode: number;
  timestamp: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export async function profileService() {
return  await authRequest<ProfileProps>(`${BASE_URL}/auth/profile`, {
    cacheStrategy: { revalidate: 3600 },
    nextTags: ['profile'],
  });
}
