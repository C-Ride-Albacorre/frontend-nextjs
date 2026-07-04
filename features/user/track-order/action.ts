
'use server';


import { submitRatingService } from './service';

export async function submitRatingAction(
  prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData,
) {
  const orderId = formData.get('orderId') as string;
  const rating = Number(formData.get('rating'));
  const comment = formData.get('comment') as string;

  console.log(' [submitRatingAction] formData:', { orderId, rating, comment });

  try {
   const response= await submitRatingService({
      orderId,
      rating,
      comment,
    });

    console.log(' [submitRatingAction] response:', response);

    return {
      success: true,
      message: 'Thanks for your feedback!',
      data : response,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error)?.message ?? 'Failed to submit review.',
    };
  }
}
