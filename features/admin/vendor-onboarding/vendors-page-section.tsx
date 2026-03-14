'use client';

import { useState } from 'react';
import VendorsTable from './vendors-table';
import VendorTabs from './vendor-tab';


export default function VendorPageSection() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="space-y-6">
      <VendorTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <VendorsTable status={activeTab} />
    </div>
  );
}
