// import { BASE_URL } from '@/config/api';

// type RegisterUserPayload = {
//   firstName: string;
//   lastName: string;
//   email?: string;
//   phoneNumber?: string;
//   password: string;
// };

// export async function registerUser(validatedFields: RegisterUserPayload) {
//   console.log('BASE_URL:', BASE_URL);

//   const res = await fetch(`${BASE_URL}/auth/customer/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(validatedFields),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data?.message || 'Registration failed');
//   }

//   return data;
// }

import { BASE_URL } from '@/config/api';
import { RegisterFormData } from '../libs/register.schema';

// Matches exactly what your API returns
export type RegisterApiResponse = {
  success: boolean;
  requiresVerification: boolean;
  message: string;
  verificationIdentifier: string;
  user: {
    id: string;
    email: string;
    role: string;
    isVerified: boolean;
  };
};

type RegisterUserPayload = Omit<RegisterFormData, 'password'> & {
  password: string;
};

export async function registerUser(
  payload: RegisterUserPayload,
): Promise<RegisterApiResponse> {
  const res = await fetch(`${BASE_URL}/auth/customer/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Registration failed');
  }

  return data as RegisterApiResponse;
}
