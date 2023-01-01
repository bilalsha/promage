import { Task } from '..';

describe('TaskModel', () => {
  test('should map the properties correctly', async () => {
    const startDate = new Date();
    const endDate = new Date();
    const task = await Task.query().insert({
      name: 'Alabester Beige Rivers',
      status: 'completed',
      startDate: startDate,
      endDate: endDate,
      description: 'A task for constructing Bridge on River'
    });

    expect(task.name).toBe('Alabester Beige Rivers');
    expect(task.status).toBe('completed');
    expect(task.description).toBe('A task for constructing Bridge on River');
    expect(task.startDate).toBe(startDate);
    expect(task.endDate).toBe(endDate);
  });
});
