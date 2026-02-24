'use client';

import { useActionState, useEffect, useState } from 'react';
import { CheckCircle2, ChevronRight, Eye, EyeOff, Mail } from 'lucide-react';
import PhoneInput from '@/components/ui/inputs/phone-input';
import FormHeader from '@/components/ui/headers/form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { vendorRegisterAction } from '@/features/auth/actions/vendor-register';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { stat } from 'fs';
import { toast } from 'sonner';
import Modal from '@/components/layout/modal';

type FieldValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  referralCode: string;
};

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  referralCode: '',
};

export default function VendorRegisterForm() {
  const [formValues, setFormValues] = useState<FieldValues>(INITIAL_VALUES);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const changeHandler =
    (field: keyof FieldValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const [state, action, pending] = useActionState(
    vendorRegisterAction,
    undefined,
  );

  const isError = state?.status === 'error';

  useEffect(() => {
    if (!state || state.status !== 'error') return;

    if (state.message) toast.error(state.message);

    if (state.errors) {
      Object.values(state.errors).forEach((fieldErrors) =>
        fieldErrors?.forEach((err) => toast.error(err)),
      );
    }
  }, [state]);

  useEffect(() => {
    if (state?.status === 'success') {
      setAcceptedTerms(false);
      setShowSuccessModal(true);
    }
  }, [state]);

  return (
    <>
      <FormHeader
        title="Create an Account"
        subtitle="Please enter your credentials below."
      />

      {/* FORM */}
      <form className="space-y-5" action={action}>
        {/* NAMES */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            name="firstName"
            value={formValues.firstName}
            onChange={changeHandler('firstName')}
            type="text"
            label="First Name"
            spacing="sm"
            placeholder="First name"
            errorMessage={isError ? state.errors?.firstName?.[0] : undefined}
          />
          <Input
            id="lastName"
            name="lastName"
            value={formValues.lastName}
            onChange={changeHandler('lastName')}
            type="text"
            label="Last Name"
            spacing="sm"
            placeholder="Last name"
            errorMessage={isError ? state.errors?.lastName?.[0] : undefined}
          />
        </div>

        <Input
          id="email"
          name="email"
          value={formValues.email}
          onChange={changeHandler('email')}
          type="email"
          label="Email Address"
          spacing="sm"
          placeholder="Enter your email"
          errorMessage={isError ? state.errors?.email?.[0] : undefined}
        />

        {/* PHONE */}

        <PhoneInput
          id="phoneNumber"
          name="phoneNumber"
          value={formValues.phoneNumber}
          onChange={changeHandler('phoneNumber')}
          errorMessage={isError ? state.errors?.phoneNumber?.[0] : undefined}
        />

        {/* PASSWORD */}
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={formValues.password}
          onChange={changeHandler('password')}
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          spacing="sm"
          rightIcon={
            <IconButton
              type="button"
              rounded="none"
              variant="gray"
              size="none"
              ariaLabel="Toggle password visibility"
              onClick={() => setShowPassword((v) => !v)}
              className="text-neutral-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </IconButton>
          }
          errorMessage={isError ? state.errors?.password?.[0] : undefined}
        />

        {/* REFERRAL */}
        <Input
          id="referralCode"
          type="text"
          name="referralCode"
          value={formValues.referralCode}
          onChange={changeHandler('referralCode')}
          label="Referral Code (Optional)"
          spacing="sm"
          placeholder="Enter code"
        />

        {/* TERMS CHECKBOX */}
        <div className="space-y-2">
          <label className="flex items-start lg:items-center gap-3 text-sm text-neutral-600 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
              }}
              className="h-4 w-4 rounded-md border-border accent-primary cursor-pointer "
            />
            <span>
              I agree to the{' '}
              <span className="text-primary font-medium">
                Terms & Conditions
              </span>
            </span>
          </label>
        </div>

        {/* CTA */}
        <Button
          type="submit"
          size="full"
          loading={pending}
          disabled={pending || !acceptedTerms}
        >
          Continue
        </Button>

        {isError && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {state.message}
          </p>
        )}
      </form>

      <Modal
        isModalOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        wrapperClassName="max-w-md"
      >
        <section className="flex flex-col items-center justify-center gap-10">
          <div className="w-16 h-16 bg-[#10B981] flex justify-center items-center aspect-square shrink-0 rounded-full ">
            <CheckCircle2 size={32} className="text-white" />
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-lg font-medium text-neutral-900">
              Registration Successful
            </h2>
            <ul className="text-sm text-neutral-600 space-y-3">
              {state?.status === 'success' &&
                state?.data?.nextSteps?.map((step: string) => (
                  <li key={step}>{step}</li>
                ))}
            </ul>
          </div>

          <Button
            rightIcon={<ChevronRight size={18} />}
            href="/verify-email"
            size="6xl"
          >
            Proceed to Email Verification
          </Button>
        </section>
      </Modal>
    </>
  );
}
