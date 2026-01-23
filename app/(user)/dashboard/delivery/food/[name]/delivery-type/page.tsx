import { Clock } from 'lucide-react';

export default function DeliveryTypePage() {
  return (
    <>
      {' '}
      <ul className="space-y-8 mt-12">
        <li className="p-8 border border-border rounded-2xl flex items-center justify-between hover:bg-primary">
          <div className="space-y-6">
            <div className="flex gap-6">
              <h5 className="font-semibold text-xl">Standard Delivery</h5>

              <span className="text-xs px-4 py-1.5 bg-primary-text-100 text-primary rounded-3xl">
                Fast
              </span>
            </div>

            <p className=" text-neutral-500 text-sm">
              Delivered within 60 - 90mins
            </p>

            <div>
              <p className="flex gap-6 font-medium">
                <span>₦ 2,000</span>
                <span className="flex items-center gap-2">
                  <Clock size={16} /> 25–35 mins
                </span>
              </p>
            </div>
          </div>

          <div>
            <input
              type="radio"
              name="delivery-type"
              id="delivery-type"
              className="w-5 h-5 text-primary-text-100 text-base md:text-sm"
            />
          </div>
        </li>

        <li className="p-8 border border-border rounded-2xl flex items-center justify-between hover:bg-primary">
          <div className="space-y-6">
            <div className="flex gap-6">
              <h5 className="font-semibold text-xl">Standard Delivery</h5>

              <span className="text-xs px-4 py-1.5 bg-primary-text-100 text-primary rounded-3xl">
                Fast
              </span>
            </div>

            <p className=" text-neutral-500 text-sm">
              Delivered within 60 - 90mins
            </p>

            <div>
              <p className="flex gap-6 font-medium">
                <span>₦ 2,000</span>
                <span className="flex items-center gap-2">
                  <Clock size={16} /> 25–35 mins
                </span>
              </p>
            </div>
          </div>

          <div>
            <input
              type="radio"
              name="delivery-type"
              id="delivery-type"
              className="w-5 h-5 text-primary-text-100 text-base md:text-sm"
            />
          </div>
        </li>
      </ul>
    </>
  );
}
