export interface IShip {
  id?: string;
  shipName?: string;
}

export class Ship implements IShip {
  constructor(public id?: string, public shipName?: string) {}
}
