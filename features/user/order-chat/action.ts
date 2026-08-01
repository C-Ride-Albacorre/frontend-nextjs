import {
  sendMessageService,
  uploadImageService,
  markMessageReadService,
  deleteMessageService,
  editMessageService,
  getChatHistoryService,
} from './services';


/* ----------------------------------------
 * GET MESSAGE
 * -------------------------------------- */

export async function getChatHistoryAction({ orderId }: { orderId: string }) {
  try {
    const response = await getChatHistoryService({
      orderId,
    });

    return {
      success: true,
      data: response.data ?? [],
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        (error as Error)?.message ??
        'Unable to load chat history.',
    };
  }
}



/* ----------------------------------------
 * SEND MESSAGE
 * -------------------------------------- */

export async function sendMessageAction(
  prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData,
) {
  const orderId = formData.get('orderId') as string;

  const message = formData.get('message') as string;

  const type = (formData.get('type') as 'TEXT' | 'IMAGE') ?? 'TEXT';

  console.log('[sendMessageAction]', {
    orderId,
    message,
    type,
  });

  try {
    const response = await sendMessageService({
      orderId,
      message,
      type,
    });

    return {
      success: true,
      message: 'Message sent.',
      data: response,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        (error as Error)?.message ??
        'Unable to send message.',
    };
  }
}

/* ----------------------------------------
 * UPLOAD IMAGE
 * -------------------------------------- */

export async function uploadImageAction(
  prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData,
) {
  const orderId = formData.get('orderId') as string;

  const file = formData.get('image') as File;

  console.log('[uploadImageAction]', {
    orderId,
    file,
  });

  try {
    const response = await uploadImageService({
      orderId,
      file,
    });

    return {
      success: true,
      message: 'Image uploaded.',
      data: response,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        (error as Error)?.message ??
        'Unable to upload image.',
    };
  }
}

/* ----------------------------------------
 * MARK READ
 * -------------------------------------- */

export async function markReadAction(messageId: string) {
  try {
    await markMessageReadService({
      messageId,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        (error as Error)?.message ??
        'Unable to mark message as read.',
    };
  }
}

/* ----------------------------------------
 * DELETE MESSAGE
 * -------------------------------------- */

export async function deleteMessageAction(messageId: string) {
  try {
    await deleteMessageService({
      messageId,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        (error as Error)?.message ??
        'Unable to delete message.',
    };
  }
}

/* ----------------------------------------
 * EDIT MESSAGE
 * -------------------------------------- */

export async function editMessageAction(
  messageId: string,
  newMessage: string,
) {
  try {
    await editMessageService({
      messageId,
      newMessage,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        (error as Error)?.message ??
        'Unable to edit message.',
    };
  }
}