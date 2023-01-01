import { Knex } from 'knex';
import { User } from '../../src/models';

const now = new Date();

const users = [
  {
    id: 1,
    name: 'Dead Unicorn',
    role: 'owner',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: 'Old Shark',
    role: 'owner',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    name: 'Red Dragon',
    role: 'owner',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 4,
    name: 'Robot Bear',
    role: 'owner',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 5,
    name: 'Angry Snake',
    role: 'manager',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 6,
    name: 'Dead Unicorn',
    role: 'manager',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 7,
    name: 'Old Shark',
    role: 'manager',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 8,
    name: 'Red Dragon',
    role: 'manager',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 9,
    name: 'Robot Bear',
    role: 'manager',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 10,
    name: 'Angry Snake',
    role: 'manager',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 11,
    name: 'Dead Unicorn',
    role: 'developer',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 12,
    name: 'Old Shark',
    role: 'developer',
    createdAt: now,
    updatedAt: now,
  },
];

export const seed = async (knex: Knex): Promise<void> => {
  await knex(User.tableName).del();
  await knex(User.tableName).insert(users);
};
