import { Box, Dot, FileText, Info,  Shield, Stars, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DeliveryConfirmationPage() {
  return (
    <>
      <div className="space-y-12 my-12">
        <div className="space-y-2">
          <p className="text-sm font-medium">Final Details</p>
          <span className="text-neutral-400 text-sm">
            Review and confirm your order
          </span>
        </div>

        <div className="space-y-2">
          <p className=" text-shadow-amber-50 font-medium">
            Special Instructions (Optional)
          </p>
          <span className="text-neutral-400 text-sm">
            Any special handling or delivery instructions
          </span>
        </div>

        <div>
          <label className="text-sm font-medium block">Promo Code</label>

          <div className="flex justify-center items-center gap-6 mt-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-1  rounded-xl bg-white border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary "
            />

            <button className="px-4 py-3 rounded-xl border border-primary text-primary text-sm hover:bg-primary hover:text-primary-text-100 cursor-pointer">
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="bg-green-100/10 flex gap-6 items-start p-8 rounded-2xl">
        <Shield size={24} className="text-green-100" />

        <div className="space-y-6">
          <h5 className="font-semibold text-lg">C-Ride Guarantee</h5>

          <ul className="space-y-4 ">
            <li className="flex items-center gap-2 text-neutral-400 text-sm">
              <Dot size={16} /> On-time delivery or full refund
            </li>

            <li className="flex items-center gap-2 text-neutral-400 text-sm">
              <Dot size={16} /> Package protection up to ₦50,000
            </li>

            <li className="flex items-center gap-2 text-neutral-400 text-sm">
              <Dot size={16} /> 24/7 customer support
            </li>

            <li className="flex items-center gap-2 text-neutral-400 text-sm">
              <Dot size={16} /> Real-time tracking included
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-12 mt-12">
        <div className="flex justify-between items-center">
          <p className="font-medium ">Pricing Breakdown</p>

          <span className="flex items-center gap-1 text-primary text-sm">
            <Info size={16} /> Transparent pricing
          </span>
        </div>

        <ul className="space-y-6 text-sm text-neutral-500">
          <li className="flex justify-between items-center">
            <span className="flex gap-3 items-center">
              <Box size={16} /> Standard Delivery
            </span>
            <span className=" text-base text-primary-text-100">₦ 6,500</span>
          </li>

          <li className="flex justify-between items-center">
            <span className="flex gap-3 items-center">
              <FileText size={16} /> Service fee
            </span>
            <span className=" text-base text-primary-text-100">₦ 6,500</span>
          </li>

          <li className="flex justify-between items-center text-primary-text-100">
            <span className="">Sub Total</span>
            <span className=" text-base text-primary-text-100">₦ 6,500</span>
          </li>

          <li className="flex justify-between items-center">
            <span>VAT (7.5%)</span>
            <span className=" text-base text-primary-text-100">₦ 500</span>
          </li>
        </ul>

        <div className="flex justify-between items-center text-xl border-t border-border py-6">
          <p>Total Amount</p>

          <span className=" text-primary">₦ 18,325</span>
        </div>
      </div>

      <div className='p-6 rounded-xl bg-primary/10 flex gap-4 items-center mt-6'>
      
          <Stars fill="#FFC814" stroke="0" size={20} />
       

        <span className='text-sm'>
          Your order will be handled with care by our premium delivery partners
        </span>
      </div>



       <div className="mt-12  flex items-center justify-center gap-8">
        <button className=" px-16 py-4 bg-foreground-100 hover:bg-foreground-200 rounded-xl font-medium text-sm  cursor-pointer flex gap-4 items-center justify-center border border-border">
          <ChevronLeft size={16} />
          Back
        </button>

        <button className=" px-16 py-4 bg-primary hover:bg-primary-hover rounded-xl font-medium text-sm  cursor-pointer flex gap-4 items-center justify-center">
          Continue
          <ChevronRight size={16} />
        </button>
      </div>
    </>
  );
}
