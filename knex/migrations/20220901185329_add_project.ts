import { Knex } from 'knex';
import { Project } from '../../src/models';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(Project.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.string('name').notNullable();
    table.string('details');
    table.integer('owner').index().references('id').inTable('user');
    table.integer('manager').index().references('id').inTable('user');
    table.dateTime('start_date').notNullable();
    table.dateTime('end_date');
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Project.tableName);