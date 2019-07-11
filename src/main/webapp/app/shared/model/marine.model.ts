import { Moment } from 'moment';
import { IShip } from 'app/shared/model/ship.model';
import { IJob } from 'app/shared/model/job.model';

export interface IMarine {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  rank?: number;
  ship?: IShip;
  jobs?: IJob[];
}

export class Marine implements IMarine {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public hireDate?: Moment,
    public rank?: number,
    public ship?: IShip,
    public jobs?: IJob[]
  ) {}
}
