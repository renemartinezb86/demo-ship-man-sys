import { IMarine } from 'app/shared/model/marine.model';
import { ITask } from 'app/shared/model/task.model';

export interface IJob {
  id?: string;
  jobTitle?: string;
  specialty?: string;
  priority?: number;
  marine?: IMarine;
  tasks?: ITask[];
}

export class Job implements IJob {
  constructor(
    public id?: string,
    public jobTitle?: string,
    public specialty?: string,
    public priority?: number,
    public marine?: IMarine,
    public tasks?: ITask[]
  ) {}
}
