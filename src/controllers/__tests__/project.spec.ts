import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import factories from '../../factories';
import { Project } from '../../models';

const server = app.listen();

afterAll(() => server.close());

describe('ProjectController', () => {
  describe('List', () => {
    test('should return not found if no userId', async () => {
      const response = await request(server).get('/projects');
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    test('should list all Projects', async () => {
      const sampleSize = 2;
      const projects = factories.project.buildList(sampleSize);
      await Promise.all(
        projects.map(async (data) => (await Project.query().insert(data)).id)
      );

      const userId = projects[0].owner;

      const response = await request(server).get(`/projects?userId=${userId}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('should list all Projects with running state as well', async () => {
      const sampleSize = 2;
      const projects = factories.project.buildList(sampleSize);
      await Promise.all(
        projects.map(async (data) => (await Project.query().insert(data)).id)
      );

      const userId = projects[0].owner;

      const response = await request(server).get(`/projects?userId=${userId}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].isRunning).toBe(true);
    });
  });

  describe('Get', () => {
    test('should get a project correctly', async () => {
      const project = factories.project.build();
      const { id } = await Project.query().insert(project);

      const response = await request(server).get(`/projects/${id}`);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(id);
    });

    test("should return 404 if project doesn't exists", async () => {
      const response = await request(server).get(`/projects/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Create', () => {
    test('should create a new project correctly', async () => {
      const project = factories.project.build();
      const response = await request(server).post(`/projects`).send(project);
      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.name).toBe(project.name);
    });
  });

  describe('Update', () => {
    test('should update a project correctly', async () => {
      const project = factories.project.build();
      const postResponse = await request(server)
        .post(`/projects`)
        .send(project);
      expect(postResponse.status).toBe(StatusCodes.CREATED);

      const newprojectData = factories.project.build();
      const patchResponse = await request(server)
        .patch(`/projects/${postResponse.body.id}`)
        .send(newprojectData);

      expect(patchResponse.status).toBe(StatusCodes.OK);
    });

    test("should return 404 if project doesn't exists", async () => {
      const response = await request(server).patch(`/projects/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    test('should change project manager correctly', async () => {
      const project = factories.project.build();
      const postResponse = await request(server)
        .post(`/projects`)
        .send(project);
      expect(postResponse.status).toBe(StatusCodes.CREATED);

      const newprojectData = factories.project.build();
      const patchResponse = await request(server)
        .patch(`/projects/${postResponse.body.id}`)
        .send(newprojectData);

      expect(patchResponse.status).toBe(StatusCodes.OK);
    });

    test('should change project start end dates correctly', async () => {
      const project = factories.project.build();
      const postResponse = await request(server)
        .post(`/projects`)
        .send(project);
      expect(postResponse.status).toBe(StatusCodes.CREATED);

      const newprojectData = factories.project.build();
      let startDate = new Date();
      newprojectData.startDate = startDate;
      const patchResponse = await request(server)
        .patch(`/projects/${postResponse.body.id}`)
        .send(newprojectData);

      expect(patchResponse.status).toBe(StatusCodes.OK);
      const getResponse = await request(server).get(`/projects/${postResponse.body.id}`);
      expect(getResponse.status).toBe(StatusCodes.OK);
      expect(getResponse.body.startDate).toBe(startDate.toISOString());
    });
  });
});
