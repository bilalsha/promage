import { Knex } from 'knex';
import { Task } from '../../src/models';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(Task.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.string('name').notNullable();
    table.string('description');
    table.enu('status', ['completed', 'started', 'not_started', 'rejected']).notNullable();
    table.integer('project_id').index().references('id').inTable('project');
    table.dateTime('start_date').notNullable();
    table.dateTime('end_date');
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Task.tableName);