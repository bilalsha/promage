import { User } from '..';

describe('UserModel', () => {
  test('should map the properties correctly', async () => {
    const user = await User.query().insert({
      name: 'Alberto Enistin',
      role: 'owner'
    });

    expect(user.name).toBe('Alberto Enistin');
    expect(user.role).toBe('owner');
  });
});
