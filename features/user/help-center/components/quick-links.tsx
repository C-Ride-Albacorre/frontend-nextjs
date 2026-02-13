import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';

export default function QuickLinks() {
  return (
    <>
      <Card gap="md" className="text-sm">
        <p>Quick Links</p>

        <div className="space-y-3">
          <Button
            size="full"
            justify="start"
            variant="primary-inverted-outline"
          >
            Terms of Service
          </Button>

          <Button
            size="full"
            justify="start"
            variant="primary-inverted-outline"
          >
            Privacy Policy
          </Button>

          <Button
            size="full"
            justify="start"
            variant="primary-inverted-outline"
          >
            Delivery Guidelines
          </Button>

          <Button
            size="full"
            justify="start"
            variant="primary-inverted-outline"
          >
            Service Areas
          </Button>
        </div>
      </Card>
    </>
  );
}
