import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { Notification } from '../../entities/notification';
import { Content } from '../../entities/content';

const server = app.listen();

afterAll(() => server.close());

describe('notification ', () => {
  test('should send a notification', async () => {
    const notification = {
      content: 'Nova solicitação de amizade',
      category: 'social',
      recipientId: 'example-recipient-id',
    };
    const response = await request(server).post(`/notifications`).send(notification);
    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });
});