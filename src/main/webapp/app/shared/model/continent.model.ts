import { IRegion } from 'app/shared/model/region.model';

export interface IContinent {
  id?: string;
  continentName?: string;
  region?: IRegion;
}

export class Continent implements IContinent {
  constructor(public id?: string, public continentName?: string, public region?: IRegion) {}
}
