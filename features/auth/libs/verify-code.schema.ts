import { z } from 'zod';

export const VerifyOtpSchema = z.object({
  otp: z.string().length(6),
});

export type VerifyOtpState = {
  errors?: {
    otp?: string[];
  };
  message?: string;
};
