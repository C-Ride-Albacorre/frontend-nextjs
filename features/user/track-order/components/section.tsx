import { CheckCircle, MapPin } from 'lucide-react';
import Image from 'next/image';

export function RouteItem({
  title,
  address,
  highlight,
  storeLogo,
}: {
  title: string;
  address: string;
  highlight?: boolean;
  storeLogo?: string;
}) {
  return (
    <div className="flex gap-4 w-full">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 aspect-square ${
          storeLogo
            ? ''
            : highlight
              ? 'bg-primary/10 text-primary'
              : ' bg-green-100/10 text-green-700'
        }
       `}
      >
        {storeLogo ? (
          <Image
            src={storeLogo}
            alt="store logo"
            width={32}
            height={32}
            className="rounded-md object-contain"
          />
        ) : (
          <MapPin size={18} />
        )}
      </div>

      <div className="space-y-3">
        <h2 className="font-medium flex items-center gap-3 text-sm capitalize">
          {title}
          {!highlight && <CheckCircle size={16} className="text-primary" />}
        </h2>
        <p className="text-sm text-neutral-500 capitalize">{address}</p>
        {/* <p className={`text-xs text-primary`}>{time}</p> */}
      </div>
    </div>
  );
}
