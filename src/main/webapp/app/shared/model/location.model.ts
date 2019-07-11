import { IContinent } from 'app/shared/model/continent.model';

export interface ILocation {
  id?: string;
  seaQuadrant?: string;
  friendlys?: string;
  hostiles?: string;
  status?: string;
  continent?: IContinent;
}

export class Location implements ILocation {
  constructor(
    public id?: string,
    public seaQuadrant?: string,
    public friendlys?: string,
    public hostiles?: string,
    public status?: string,
    public continent?: IContinent
  ) {}
}
