import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShipLog } from 'app/shared/model/ship-log.model';

type EntityResponseType = HttpResponse<IShipLog>;
type EntityArrayResponseType = HttpResponse<IShipLog[]>;

@Injectable({ providedIn: 'root' })
export class ShipLogService {
  public resourceUrl = SERVER_API_URL + 'api/ship-logs';

  constructor(protected http: HttpClient) {}

  create(shipLog: IShipLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shipLog);
    return this.http
      .post<IShipLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(shipLog: IShipLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shipLog);
    return this.http
      .put<IShipLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IShipLog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IShipLog[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(shipLog: IShipLog): IShipLog {
    const copy: IShipLog = Object.assign({}, shipLog, {
      datetime: shipLog.datetime != null && shipLog.datetime.isValid() ? shipLog.datetime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datetime = res.body.datetime != null ? moment(res.body.datetime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((shipLog: IShipLog) => {
        shipLog.datetime = shipLog.datetime != null ? moment(shipLog.datetime) : null;
      });
    }
    return res;
  }
}
