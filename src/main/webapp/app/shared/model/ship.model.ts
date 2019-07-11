import { ILocation } from 'app/shared/model/location.model';
import { IMarine } from 'app/shared/model/marine.model';

export interface IShip {
  id?: string;
  shipName?: string;
  location?: ILocation;
  marines?: IMarine[];
}

export class Ship implements IShip {
  constructor(public id?: string, public shipName?: string, public location?: ILocation, public marines?: IMarine[]) {}
}
