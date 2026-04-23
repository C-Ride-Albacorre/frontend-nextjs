import { cookies } from 'next/headers';
import { getTokenExpiry } from './jwt';

const isProd = process.env.NODE_ENV === 'production';

// Cookie names as constants
export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ROLE: 'userRole',
  VERIFICATION_TOKEN: 'verificationToken',
  VERIFY_IDENTIFIER: 'verify_identifier',
  VENDOR_PHONE_NUMBER: 'vendor_phone',
  VENDOR_EMAIL: 'vendor_email',
  REGISTRATION_METHOD: 'registration_method',
  USER_ID: 'userId',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PHONE_NUMBER: 'phone',
  AVATAR_URL: 'avatarUrl',
} as const;

// Default cookie options
const defaultOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  path: '/',
};

// Set a single cookie
interface SetCookieOptions {
  name: string;
  value: string;
  maxAge?: number;
}

export async function setCookie({ name, value, maxAge }: SetCookieOptions) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    ...defaultOptions,
    ...(maxAge && { maxAge }),
  });
}

// Get a single cookie
export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

// Delete a single cookie
export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

// export async function setUserDisplayCookie(
//   user: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email?: string;
//     phone_number?: string;
//     avatarUrl?: string;
//   },
//   refreshToken: string,
// ) {
//   const cookieStore = await cookies();

//   const maxAge = getTokenExpiry(refreshToken);

//   cookieStore.set(COOKIE_KEYS.USER_ID, user.id, {
//     ...defaultOptions,
//     maxAge,
//   });

//   cookieStore.set(COOKIE_KEYS.FIRST_NAME, user.firstName, {
//     ...defaultOptions,
//     maxAge,
//   });

//   cookieStore.set(COOKIE_KEYS.LAST_NAME, user.lastName, {
//     ...defaultOptions,
//     maxAge,
//   });

//   if (user.email) {
//     cookieStore.set(COOKIE_KEYS.EMAIL, user.email, {
//       ...defaultOptions,
//       maxAge,
//     });
//   }
//   if (user.phone_number) {
//     cookieStore.set(COOKIE_KEYS.PHONE_NUMBER, user.phone_number, {
//       ...defaultOptions,
//       maxAge,
//     });
//   }
//   if (user.avatarUrl) {
//     cookieStore.set(COOKIE_KEYS.AVATAR_URL, user.avatarUrl, {
//       ...defaultOptions,
//       maxAge,
//     });
//   }
// }

// Set cookies after registration — gates access to /verify/* routes
export async function setVerificationCookies({
  verificationToken,
  verifyIdentifier,
  registrationMethod,
}: {
  verificationToken: string;
  verifyIdentifier: string;
  registrationMethod: string;
}) {
  const cookieStore = await cookies();
  const maxAge = getTokenExpiry(verificationToken); // respect the token's own expiry

  cookieStore.set(COOKIE_KEYS.VERIFICATION_TOKEN, verificationToken, {
    ...defaultOptions,
    maxAge,
  });
  cookieStore.set(COOKIE_KEYS.VERIFY_IDENTIFIER, verifyIdentifier, {
    ...defaultOptions,
    maxAge,
  });
  cookieStore.set(COOKIE_KEYS.REGISTRATION_METHOD, registrationMethod, {
    ...defaultOptions,
    maxAge,
  });
}

export async function setVendorVerificationCookies({
  verificationToken,
  vendorPhoneNumber,
  vendorEmail,
}: {
  verificationToken: string;
  vendorPhoneNumber: string;
  vendorEmail: string;
}) {
  const cookieStore = await cookies();
  const maxAge = getTokenExpiry(verificationToken);

  cookieStore.set(COOKIE_KEYS.VERIFICATION_TOKEN, verificationToken, {
    ...defaultOptions,
    maxAge,
  });
  cookieStore.set(COOKIE_KEYS.VENDOR_PHONE_NUMBER, vendorPhoneNumber, {
    ...defaultOptions,
    maxAge,
  });
  cookieStore.set(COOKIE_KEYS.VENDOR_EMAIL, vendorEmail, {
    ...defaultOptions,
    maxAge,
  });
}
// Set auth cookies (access + refresh tokens)
export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_KEYS.ACCESS_TOKEN);
  cookieStore.delete(COOKIE_KEYS.REFRESH_TOKEN);

  const accessTokenMaxAge = getTokenExpiry(accessToken);
  const refreshTokenMaxAge = getTokenExpiry(refreshToken);

  cookieStore.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
    ...defaultOptions,
    maxAge: accessTokenMaxAge,
  });

  cookieStore.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
    ...defaultOptions,
    maxAge: refreshTokenMaxAge,
  });
}

export async function getUserRole(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_KEYS.USER_ROLE)?.value || null;
}

// Get auth tokens
export async function getAuthTokens() {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get(COOKIE_KEYS.ACCESS_TOKEN)?.value,
    refreshToken: cookieStore.get(COOKIE_KEYS.REFRESH_TOKEN)?.value,
  };
}

// Clear all auth cookies (for logout)
export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_KEYS.ACCESS_TOKEN);
  cookieStore.delete(COOKIE_KEYS.REFRESH_TOKEN);
  cookieStore.delete(COOKIE_KEYS.USER_ROLE);
  cookieStore.delete(COOKIE_KEYS.VERIFICATION_TOKEN);
  cookieStore.delete(COOKIE_KEYS.VERIFY_IDENTIFIER);
  cookieStore.delete(COOKIE_KEYS.REGISTRATION_METHOD);
  cookieStore.delete(COOKIE_KEYS.FIRST_NAME);
  cookieStore.delete(COOKIE_KEYS.LAST_NAME);
  cookieStore.delete(COOKIE_KEYS.EMAIL);
  cookieStore.delete(COOKIE_KEYS.PHONE_NUMBER);
  cookieStore.delete(COOKIE_KEYS.AVATAR_URL);
}

export async function clearVerificationCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_KEYS.VERIFICATION_TOKEN);
  cookieStore.delete(COOKIE_KEYS.VERIFY_IDENTIFIER);
  cookieStore.delete(COOKIE_KEYS.REGISTRATION_METHOD);
  cookieStore.delete(COOKIE_KEYS.VENDOR_PHONE_NUMBER);
  cookieStore.delete(COOKIE_KEYS.VENDOR_EMAIL);
}

// Check if user is authenticated (has valid access token)
export async function isAuthenticated(): Promise<boolean> {
  const { accessToken } = await getAuthTokens();

  return !!accessToken;
}

export async function getAuthInfo() {
  const { accessToken } = await getAuthTokens();
  const role = await getUserRole();

  return {
    isAuthenticated: !!accessToken,
    role,
  };
}
