import { Id, Model, RelationMappings } from 'objection';
import Base from './base';
import { User } from './user.model';

export class Project extends Base {
  id!: Id;
  name!: string;
  manager!: number;
  owner!: number;
  startDate!: Date;
  endDate!: Date;
  details!: string;

  static tableName = 'project';
  isRunning: boolean | undefined;

  static get relationMappings(): RelationMappings {
    return {
      ownerRelation: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'project.owner',
          to: 'user.id',
        },
      },
      managerRelation: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'project.manager',
          to: 'user.id',
        },
      },
    };
  }
}
