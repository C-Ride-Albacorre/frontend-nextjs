'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import Input from '@/components/ui/inputs/input';
import { Eye, EyeOff } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { createAdminAction } from '../action';
import { toast } from 'sonner';
import SuccessModal from './success-modal';
import ErrorMessage from '@/components/layout/error-message';

export default function CreateAdminForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, action, pending] = useActionState(createAdminAction, undefined);

  const isError = state?.status === 'error';

  useEffect(() => {
    if (!state) return;

    if (state.status === 'success') {
      setIsModalOpen(true);
      return;
    }

    if (state.status === 'error') {
      if (state.message) toast.error(state.message);
      if (state.errors) {
        Object.values(state.errors).forEach((fieldErrors) =>
          fieldErrors?.forEach((err) => toast.error(err)),
        );
      }
    }
  }, [state]);

  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <Card spacing="lg" gap="lg" className="w-full max-w-2xl bg-white">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Create Admin</h1>
            <p className="text-sm text-neutral-400">
              Create a new admin account to manage the platform.
            </p>
          </div>

          {isError && state?.message && (
            <ErrorMessage message={state?.message} />
          )}

          <form action={action} className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <Input
                label="First Name"
                name="firstName"
                defaultValue={
                  state?.status === 'error'
                    ? state.fields?.firstName
                    : undefined
                }
                errorMessage={
                  isError ? state.errors?.firstName?.[0] : undefined
                }
              />

              <Input
                label="Last Name"
                name="lastName"
                defaultValue={
                  state?.status === 'error' ? state.fields?.lastName : undefined
                }
                errorMessage={isError ? state.errors?.lastName?.[0] : undefined}
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              name="email"
              defaultValue={
                state?.status === 'error' ? state.fields?.email : undefined
              }
              errorMessage={isError ? state.errors?.email?.[0] : undefined}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
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

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? 'Creating...' : 'Create Admin'}
            </Button>
          </form>
        </Card>
      </div>

      {state?.status === 'success' && (
        <SuccessModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          state={state}
        />
      )}
    </>
  );
}
