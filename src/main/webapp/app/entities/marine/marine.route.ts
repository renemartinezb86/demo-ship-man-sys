import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Marine } from 'app/shared/model/marine.model';
import { MarineService } from './marine.service';
import { MarineComponent } from './marine.component';
import { MarineDetailComponent } from './marine-detail.component';
import { MarineUpdateComponent } from './marine-update.component';
import { MarineDeletePopupComponent } from './marine-delete-dialog.component';
import { IMarine } from 'app/shared/model/marine.model';

@Injectable({ providedIn: 'root' })
export class MarineResolve implements Resolve<IMarine> {
  constructor(private service: MarineService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMarine> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Marine>) => response.ok),
        map((marine: HttpResponse<Marine>) => marine.body)
      );
    }
    return of(new Marine());
  }
}

export const marineRoute: Routes = [
  {
    path: '',
    component: MarineComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.marine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MarineDetailComponent,
    resolve: {
      marine: MarineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.marine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MarineUpdateComponent,
    resolve: {
      marine: MarineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.marine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MarineUpdateComponent,
    resolve: {
      marine: MarineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.marine.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const marinePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MarineDeletePopupComponent,
    resolve: {
      marine: MarineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.marine.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
