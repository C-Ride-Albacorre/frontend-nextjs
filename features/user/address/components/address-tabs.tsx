import { MapIcon, MapPin, Plus } from 'lucide-react';
import { AddressTabTypes } from '../types';

export default function AddressTabs({ active, setActive }: AddressTabTypes) {
  const tabClass = (key: string) =>
    `flex-1 py-4  text-xs font-medium flex flex-col items-center gap-3  justify-center cursor-pointer ${
      active === key
        ? 'bg-primary rounded-xl text-primary-text-100'
        : 'hover:bg-foreground-200 text-gray-500'
    }`;

  return (
    <div className="grid grid-cols-3 bg-foreground-100 rounded-xl my-6">
      <button onClick={() => setActive('saved')} className={tabClass('saved')}>
        <MapPin size={18} /> Saved
      </button>
      <button onClick={() => setActive('map')} className={tabClass('map')}>
        <MapIcon size={18} /> Map
      </button>
      <button
        onClick={() => setActive('manual')}
        className={tabClass('manual')}
      >
        <Plus size={18} /> Manual
      </button>
    </div>
  );
}
