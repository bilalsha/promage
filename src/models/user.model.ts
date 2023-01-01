import { Id, Model, RelationMappings } from 'objection';
import Base from './base';

export class User extends Base {
  id!: Id;
  name!: string;
  role!: string;

  static tableName = 'user';

  static get relationMappings(): RelationMappings {
    return {};
  }
}
