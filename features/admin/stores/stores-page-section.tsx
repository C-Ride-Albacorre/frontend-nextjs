'use client';

import { useState } from 'react';
import StoresTable from './stores-table';
import StoreTabs from './store-tab';

export default function StorePageSection() {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="space-y-6">
      <StoreTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <StoresTable status={activeTab} />
    </div>
  );
}
