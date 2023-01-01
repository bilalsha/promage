import { Content } from '../content';
import { Notification } from '../notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
    expect(notification.category).toBe('social');
    expect(notification.content.value).toBe('Nova solicitação de amizade');
    expect(notification.recipientId).toBe('example-recipient-id');
    expect(notification.id).toBeTruthy();
  });

  it('should be able to create a notification with ID', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'example-recipient-id',
    }, '45');

    expect(notification).toBeTruthy();
    expect(notification.category).toBe('social');
    expect(notification.content.value).toBe('Nova solicitação de amizade');
    expect(notification.recipientId).toBe('example-recipient-id');
    expect(notification.id).toBe('45');
  });
});
