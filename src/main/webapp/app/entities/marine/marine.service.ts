import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMarine } from 'app/shared/model/marine.model';

type EntityResponseType = HttpResponse<IMarine>;
type EntityArrayResponseType = HttpResponse<IMarine[]>;

@Injectable({ providedIn: 'root' })
export class MarineService {
  public resourceUrl = SERVER_API_URL + 'api/marines';

  constructor(protected http: HttpClient) {}

  create(marine: IMarine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(marine);
    return this.http
      .post<IMarine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(marine: IMarine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(marine);
    return this.http
      .put<IMarine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IMarine>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMarine[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(marine: IMarine): IMarine {
    const copy: IMarine = Object.assign({}, marine, {
      hireDate: marine.hireDate != null && marine.hireDate.isValid() ? marine.hireDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.hireDate = res.body.hireDate != null ? moment(res.body.hireDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((marine: IMarine) => {
        marine.hireDate = marine.hireDate != null ? moment(marine.hireDate) : null;
      });
    }
    return res;
  }
}
