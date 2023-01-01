
import { Content } from '../../entities/content';
import { SendNotification } from '../send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification.content.value).toStrictEqual('This is a notification');
    expect(notification.recipientId).toBe('example-recipient-id');
  });
});
