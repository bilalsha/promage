import { Id, Model, RelationMappings } from 'objection';
import Base from './base';
import { Project } from './project.model';

export class Task extends Base {
  id!: Id;
  name!: string;
  projectId!: number;
  startDate!: Date;
  endDate!: Date;
  description!: string;
  status!: string;

  static tableName = 'task';

  static get relationMappings(): RelationMappings {
    return {
      projectRelation: {
        relation: Model.HasOneRelation,
        modelClass: Project,
        join: {
          from: 'task.project_id',
          to: 'project.id',
        },
      }
    };
  }
}
