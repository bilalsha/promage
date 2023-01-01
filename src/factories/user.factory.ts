import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { User } from '../models';

export default Factory.define(User.tableName).attrs({
  name: `${faker.animal.type()} ${faker.animal.type()}`,
  role: faker.helpers.arrayElement(['owner', 'manager', 'developer']),
});
