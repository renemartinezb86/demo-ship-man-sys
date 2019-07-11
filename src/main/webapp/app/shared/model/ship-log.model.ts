import { Moment } from 'moment';
import { IShip } from 'app/shared/model/ship.model';
import { IMarine } from 'app/shared/model/marine.model';

export const enum EntryType {
  COMMAND = 'COMMAND',
  COMMUNICATION = 'COMMUNICATION',
  TASK = 'TASK'
}

export interface IShipLog {
  id?: string;
  datetime?: Moment;
  entrytext?: string;
  entrytype?: EntryType;
  ship?: IShip;
  marine?: IMarine;
}

export class ShipLog implements IShipLog {
  constructor(
    public id?: string,
    public datetime?: Moment,
    public entrytext?: string,
    public entrytype?: EntryType,
    public ship?: IShip,
    public marine?: IMarine
  ) {}
}
