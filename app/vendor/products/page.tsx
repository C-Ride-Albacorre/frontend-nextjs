import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import { Plus, Upload } from 'lucide-react';

export default function ProductsPage() {
  return (
    <section>
      <div className="space-y-6 pb-8">
        <VendorDashboardHeader
          pageTitle="Products"
          pageDescription="The Place Restaurant - Victoria Island, Lagos"
        />

        <div className="space-y-8 px-4 lg:px-8">
          <Card>
            <div className="px-4 md:px-8 flex justify-between items-start gap-8">
              <div className="space-y-8">
                <div className="space-y-2 md:space-y-2.5 flex-1">
                  <p className="font-medium text-neutral-900">
                    Product Upload Requirements
                  </p>
                  <p className="text-xs md:text-sm font-normal leading-6 text-neutral-500">
                    All products must have real, high-quality images (minimum
                    800x800px, clear lighting, professional presentation)
                  </p>
                </div>

                <Button variant="primary" size="lg" type='submit'>
                  <Plus size={18} /> Add Product
                </Button>
              </div>

              <div className="bg-primary/10 hover:bg-primary/20 rounded-full h-10 w-10 md:h-14 md:w-14 shrink-0 aspect-square flex items-center justify-center cursor-pointer">
                <Upload size={20} className="text-primary" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
