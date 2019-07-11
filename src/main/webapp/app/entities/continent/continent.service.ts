import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContinent } from 'app/shared/model/continent.model';

type EntityResponseType = HttpResponse<IContinent>;
type EntityArrayResponseType = HttpResponse<IContinent[]>;

@Injectable({ providedIn: 'root' })
export class ContinentService {
  public resourceUrl = SERVER_API_URL + 'api/continents';

  constructor(protected http: HttpClient) {}

  create(continent: IContinent): Observable<EntityResponseType> {
    return this.http.post<IContinent>(this.resourceUrl, continent, { observe: 'response' });
  }

  update(continent: IContinent): Observable<EntityResponseType> {
    return this.http.put<IContinent>(this.resourceUrl, continent, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IContinent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContinent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
