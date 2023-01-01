import { Project } from '..';

describe('ProjectModel', () => {
  test('should map the properties correctly', async () => {
    const startDate = new Date();
    const endDate = new Date();
    const project = await Project.query().insert({
      name: 'Alabester Beige Rivers',
      owner: 1,
      manager:2,
      startDate: startDate,
      endDate: endDate,
      details: 'A Project for constructing Bridge on River'
    });

    expect(project.name).toBe('Alabester Beige Rivers');
    expect(project.owner).toBe(1);
    expect(project.manager).toBe(2);
    expect(project.details).toBe('A Project for constructing Bridge on River');
  });
});
