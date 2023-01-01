import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import path from 'path';

import factories from '../../factories';
import { Task } from '../../models';

const server = app.listen();

afterAll(() => server.close());

describe('TaskController', () => {
  describe('List', () => {
    test('should list all tasks', async () => {
      const sampleSize = 2;
      const tasks = factories.task.buildList(sampleSize);
      await Promise.all(
        tasks.map(async (data) => (await Task.query().insert(data)).id)
      );

      const projectId = tasks[0].projectId;

      const response = await request(server).get(`/tasks?projectId=${projectId}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThan(0);
    });


    test('should return not found if no userId', async () => {
      const response = await request(server).get('/tasks');
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Get', () => {
    test('should get a task correctly', async () => {
      const task = factories.task.build();
      const { id } = await Task.query().insert(task);

      const response = await request(server).get(`/tasks/${id}`);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(id);
    });

    test("should return 404 if task doesn't exists", async () => {
      const response = await request(server).get(`/tasks/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Create', () => {
    test('should create a new task correctly', async () => {
      const task = factories.task.build();
      const response = await request(server).post(`/tasks`).send(task);
      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.name).toBe(task.name);
    });
  });

  describe('Update', () => {
    test('should update a task correctly', async () => {
      const task = factories.task.build();
      const postResponse = await request(server)
        .post(`/tasks`)
        .send(task);
      expect(postResponse.status).toBe(StatusCodes.CREATED);

      const newtaskData = factories.task.build();
      const putResponse = await request(server)
        .put(`/tasks/${postResponse.body.id}`)
        .send(newtaskData);

      expect(putResponse.status).toBe(StatusCodes.OK);
    });

    test("should return 404 if task doesn't exists", async () => {
      const response = await request(server).put(`/tasks/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
