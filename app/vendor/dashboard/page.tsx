'use client';

import OnboardingStepsLayout from '@/features/vendor-dashboard/components/onboarding-steps';
import VendorDashboardHeader from '@/features/vendor-dashboard/layout/header';
import {
  InfoGrid,
  InfoRow,
  DocumentRow,
  Section,
  Support,
} from '@/features/vendor-dashboard/components/section';

import {
  Store,
  CreditCard,
  Settings,
  FileText,
  AlertCircle,
  HomeIcon,
  Building2,
  Briefcase,
  MapPin,
  User,
  File,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { DOCUMENTS } from '@/features/vendor-dashboard/data';

export default function VendorOnboardingDashboard() {
  return (
    <section>
      <div className="space-y-6 pb-8">
        {/* ================= HEADER ================= */}

        <VendorDashboardHeader />

        <div className="space-y-8 px-4 lg:px-8">
          <OnboardingStepsLayout />

          <Section
            icon={<Store />}
            title="Business Information"
            subtitle="Registered business details"
            status="Verified"
            from="#D4AF37"
            to="#B8941F"
            edit
          >
            <InfoGrid>
              <InfoRow
                icon={<Building2 size={20} />}
                label="Business Name"
                value="The Place Restaurant"
              />

              <InfoRow
                icon={<MapPin size={20} />}
                label="Address"
                value="21 Akin Adesola Street, Victoria Island, Lagos"
              />

              <InfoRow
                icon={<Briefcase size={20} />}
                label="Business Type"
                value="Restaurant & Catering"
              />

              <InfoRow
                icon={<User size={20} />}
                label="Contact Person"
                value="John Doe"
              />

              <InfoRow
                icon={<FileText size={20} />}
                label="Registration Number"
                value="RC-1234567"
              />

              <InfoRow
                icon={<Phone size={20} />}
                label="Business Phone"
                value="+234 803 456 7890"
              />

              <InfoRow
                icon={<FileText size={20} />}
                label="Tax ID"
                value="TIN-9876543210"
              />

              <InfoRow
                icon={<Mail size={20} />}
                label="Business Email"
                value="info@theplace.ng"
              />

              <InfoRow
                icon={<Calendar size={20} />}
                label="Registration Date"
                value="2024-01-20"
              />

              <InfoRow
                icon={<CheckCircle size={20} />}
                label="Approval Date"
                value="2024-01-20"
                highlight
              />
            </InfoGrid>
          </Section>

          {/* ================= BANK ================= */}
          <Section
            icon={<CreditCard />}
            title="Bank Account Details"
            subtitle="Payment settlement information"
            status="Verified"
            from="#10B981"
            to="#059669"
            edit
          >
            <InfoGrid>
              <InfoRow label="Bank Name" value="Guaranty Trust Bank" />
              <InfoRow label="Account Name" value="The Place Restaurant Ltd" />
              <InfoRow label="Account Number" value="0123456789" />
              <InfoRow label="Bank Code" value="058" />
            </InfoGrid>
          </Section>

          {/* ================= OPERATIONS ================= */}
          <Section
            icon={<Settings />}
            title="Operational Settings"
            subtitle="Service hours and delivery configuration"
            status="Active"
            from="#8B5CF6"
            to="#6D28D9"
            edit
          >
            <InfoGrid>
              <InfoRow label="Operating Hours" value="09:00 AM – 10:00 PM" />
              <InfoRow label="Minimum Order" value="₦2,500" />
              <InfoRow label="Delivery Radius" value="5km" />
              <InfoRow label="Delivery Fee Range" value="₦1,500 – ₦3,000" />
              <InfoRow label="Preparation Time" value="30–45 minutes" />
            </InfoGrid>
          </Section>

          {/* ================= DOCUMENTS ================= */}

          <Section
            icon={<File />}
            title="Documents & Verification"
            subtitle="Compliance and legal documents"
            document
            from="#F59E0B"
            to="#D97706"
          >
            <div className="space-y-4 px-4 md:px-10">
              {DOCUMENTS.map((doc) => (
                <DocumentRow
                  key={doc.name}
                  name={doc.name}
                  desc={doc.desc}
                  verified={doc.verified}
                />
              ))}
            </div>
          </Section>

          {/* ================= SUPPORT ================= */}
          <Support />
        </div>
      </div>
    </section>
  );
}
