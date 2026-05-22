'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/buttons/button';
import { Loader, RefreshCcw } from 'lucide-react';

export default function RetryButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;

    setLoading(true);
    router.refresh();

    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="icon"
      disabled={loading}
    
    >
      {loading ? `${<Loader size={16} className="animate-spin" />} Retrying...` : 'Retry'}
    </Button>
  );
}
