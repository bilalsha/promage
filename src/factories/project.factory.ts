import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { Project } from '../models';

export default Factory.define(Project.tableName).attrs({
  name: `${faker.animal.type()} ${faker.animal.type()}`,
  owner: faker.datatype.number({ min: 1, max: 5 }),
  manager: faker.datatype.number({ min: 6, max: 10 }),
  endDate: faker.date.future(),
  startDate: faker.date.past(),
  details: faker.lorem.paragraph(),
});
