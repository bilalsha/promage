import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { Task } from '../models';

export default Factory.define(Task.tableName).attrs({
  name: `${faker.animal.type()} ${faker.animal.type()}`,
  projectId: faker.datatype.number({ min: 1, max: 5 }),
  status: faker.helpers.arrayElement(['completed', 'started', 'not_started', 'rejected']),
  endDate: faker.date.future(),
  startDate: faker.date.past(),
  description: faker.lorem.paragraph(),
});
