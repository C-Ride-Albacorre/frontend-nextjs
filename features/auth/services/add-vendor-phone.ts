import { BASE_URL } from '@/config/api';
import { ApiError } from '../../libs/api-error';


export async function addVendorPhoneService(data: { phoneNumber: string , countryCode: string, verificationToken?: string }) {

console.log('Add vendor phone service called with:', data);

  const res = await fetch(`${BASE_URL}/auth/user/add/phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });



  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to add phone number',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}
