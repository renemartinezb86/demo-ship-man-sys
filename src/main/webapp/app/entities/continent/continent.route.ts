import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Continent } from 'app/shared/model/continent.model';
import { ContinentService } from './continent.service';
import { ContinentComponent } from './continent.component';
import { ContinentDetailComponent } from './continent-detail.component';
import { ContinentUpdateComponent } from './continent-update.component';
import { ContinentDeletePopupComponent } from './continent-delete-dialog.component';
import { IContinent } from 'app/shared/model/continent.model';

@Injectable({ providedIn: 'root' })
export class ContinentResolve implements Resolve<IContinent> {
  constructor(private service: ContinentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContinent> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Continent>) => response.ok),
        map((continent: HttpResponse<Continent>) => continent.body)
      );
    }
    return of(new Continent());
  }
}

export const continentRoute: Routes = [
  {
    path: '',
    component: ContinentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.continent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContinentDetailComponent,
    resolve: {
      continent: ContinentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.continent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContinentUpdateComponent,
    resolve: {
      continent: ContinentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.continent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContinentUpdateComponent,
    resolve: {
      continent: ContinentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.continent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const continentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ContinentDeletePopupComponent,
    resolve: {
      continent: ContinentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.continent.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
