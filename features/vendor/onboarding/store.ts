// /stores/onboarding-store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useState } from 'react';

type BusinessInfo = {
  businessName: string;
  businessType: string;
  registrationNumber: string;
  taxId: string;
  description: string;
};

type ContactInfo = {
  businessEmail: string;
  businessPhone: string;
};

type AddressInfo = {
  address: string;
  city: string;
  state: string;
};

type BankInfo = {
  bankName: string;
  accountNumber: string;
  accountName: string;
};

type DocumentSlot = {
  documentType: string;
  description: string;
  label: string;
  file: File | null;
  status: 'idle' | 'done';
};

type OnboardingState = {
  businessInfo: BusinessInfo;
  contactInfo: ContactInfo;
  addressInfo: AddressInfo;
  bankInfo: BankInfo;
  documents: DocumentSlot[];

  setBusinessInfo: (data: Partial<BusinessInfo>) => void;
  setContactInfo: (data: Partial<ContactInfo>) => void;
  setAddressInfo: (data: Partial<AddressInfo>) => void;
  setBankInfo: (data: Partial<BankInfo>) => void;
  setDocuments: (docs: DocumentSlot[]) => void;

  resetAll: () => void;
};

const DOCUMENT_SLOTS: DocumentSlot[] = [
  {
    documentType: 'CAC',
    description: 'CAC certificate',
    label: 'CAC Certificate',
    file: null,
    status: 'idle',
  },
  {
    documentType: 'BUSINESS_PERMIT',
    description: 'Operating license',
    label: 'Business Permit',
    file: null,
    status: 'idle',
  },
  {
    documentType: 'ID_PROOF',
    description: "Owner's government-issued ID",
    label: 'Valid ID',
    file: null,
    status: 'idle',
  },
];

const initialState = {
  businessInfo: {
    businessName: '',
    businessType: '',
    registrationNumber: '',
    taxId: '',
    description: '',
  },
  contactInfo: {
    businessEmail: '',
    businessPhone: '',
  },
  addressInfo: {
    address: '',
    city: '',
    state: '',
  },
  bankInfo: {
    bankName: '',
    accountNumber: '',
    accountName: '',
  },
  documents: DOCUMENT_SLOTS,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,

      setBusinessInfo: (data) =>
        set((s) => ({ businessInfo: { ...s.businessInfo, ...data } })),

      setContactInfo: (data) =>
        set((s) => ({ contactInfo: { ...s.contactInfo, ...data } })),

      setAddressInfo: (data) =>
        set((s) => ({ addressInfo: { ...s.addressInfo, ...data } })),

      setBankInfo: (data) =>
        set((s) => ({ bankInfo: { ...s.bankInfo, ...data } })),

      setDocuments: (docs) => set({ documents: docs }),

      resetAll: () => set(initialState),
    }),
    {
      name: 'onboarding-storage',
      partialize: (state) => ({
        ...state,
        documents: state.documents.map((doc) => ({
          ...doc,
          file: null,
        })),
      }),
    },
  ),
);

/**
 * Hook that returns true once Zustand has rehydrated from localStorage.
 * Use this to prevent flash of empty fields on hard refresh.
 */
export function useOnboardingHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useOnboardingStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    if (useOnboardingStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return unsub;
  }, []);

  return hydrated;
}
