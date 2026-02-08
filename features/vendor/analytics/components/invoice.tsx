import Card from "@/components/layout/card";
import { Button } from "@/components/ui/buttons/button";
import { Download, Eye } from "lucide-react";
import { MOCK_DATA } from "../data";
import { Period } from "../type";

export default function AnalyticsInvoice({
    data
}: {
    data: typeof MOCK_DATA[Period]
}) {
  return (
    <Card gap="sm" spacing="sm" className="p-4 space-y-8 ">
      <div>
        <p className="text-sm font-medium mb-2">Monthly Invoices</p>
      </div>

      <ul className="space-y-4">
        {data.invoices.map((item: any, index: number) => (
          <li key={index}>
            <Card gap="md" spacing="sm" className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p>{item.month}</p>

                  <p className="text-primary text-sm font-medium">
                    {item.amount}
                  </p>
                </div>

                <span className="text-xs text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full">
                  {item.status}
                </span>
              </div>

              <div className="w-full flex  items-center justify-center gap-4 ">
                <Button variant="outline" size="icon" className="text-xs  p-2">
                  <Eye size={16} />
                  Preview
                </Button>

                <Button variant="primary" size="icon" className="text-xs p-2">
                  <Download size={16} />
                  Download
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Card>
  );
}
