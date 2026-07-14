'use client';

import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons/button';
import Textarea from '@/components/ui/inputs/textarea';
import { CheckCircle, CheckCircle2, LoaderCircle, Star } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitRatingAction } from '../action';
import Input from '@/components/ui/inputs/input';
import { toast } from 'sonner';

const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export default function RatingsModal({
  isOpen,
  onClose,
  driver,
  orderId,
}: {
  orderId: string;
  isOpen: boolean;
  onClose?: () => void;
  driver?: any;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [hover, setHover] = useState(0);

  const router = useRouter();

  console.log(' Driver:', driver);

  const handleSelectTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const combinedComment = [...selectedTags, comment.trim()]
    .filter(Boolean)
    .join(', ');

  const [state, formAction, pending] = useActionState(submitRatingAction, {
    success: false,
    message: '',
  });

  const isError = !state.success;

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push('/user/delivery');
    }

    if (isError && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Modal isModalOpen={isOpen} onClose={onClose}>
      <div className="space-y-8">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100/10">
          <CheckCircle className="h-10 w-10 text-green-100" />
        </div>

        {/* Title */}
        <div className=" text-center">
          <h2 className="text-2xl font-bold">Order Delivered 🎉</h2>

          <p className=" text-sm text-neutral-500">
            How was your delivery experience?
          </p>
        </div>

        {/* Driver */}
        <Card border="none" className="bg-primary/10 ">
          <div className="flex items-center gap-6">
            <Avatar size={64} name={driver?.fullName ?? 'Assigned Driver'} />

            <div className="flex-1">
              <h3 className="font-semibold capitalize">
                {driver?.fullName ?? 'Assigned Driver'}
              </h3>
              <p className="text-xs text-neutral-500">Delivery Partner</p>
            </div>
          </div>
        </Card>

        {/* Rating */}
        <form className="space-y-8" action={formAction}>
          <input type="hidden" name="orderId" value={orderId} />
          <input type="hidden" name="rating" value={rating} />
          <input type="hidden" name="comment" value={combinedComment} />

          <h4 className="mb-4 text-center font-medium">Tap a star to rate</h4>

          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110 cursor-pointer"
              >
                <Star
                  className={`h-8 w-8 transition-all ${
                    (hover || rating) >= star
                      ? 'fill-primary text-primary'
                      : 'text-neutral-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="mt-3 text-center text-sm text-neutral-500">
            {labels[rating]}
          </p>

          {/* Tags */}
          <div className="space-y-4">
            <h4 className=" text-sm font-medium">What went well?</h4>

            <div className="flex flex-wrap gap-2">
              {[
                'Friendly',
                'Fast Delivery',
                'Professional',
                'Great Communication',
                'Handled Food Carefully',
              ].map((tag) => (
                <Button
                  key={tag}
                  rounded="full"
                  size="icon"
                  variant={selectedTags.includes(tag) ? 'primary' : 'white'}
                  onClick={() => handleSelectTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <Textarea
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience"
            />
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="flex-1"
              href="/user/delivery"
            >
              Skip
            </Button>

            <Button
              size="icon"
              type="submit"
              loading={pending}
              className="flex-1"
              disabled={!rating || pending}
            >
              {pending ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle size={16} className="animate-spin" />{' '}
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Feedback'
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
