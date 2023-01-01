import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SendNotification } from '../services/send-notification';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

export const send = async (req: Request, res: Response): Promise<Response> => {
  const { recipientId, content, category } = req.body;

  await new SendNotification().execute({
    content,
    category,
    recipientId,
  });

  return res.sendStatus(StatusCodes.NO_CONTENT);
}

export const NotificationController = {
  send,
};
