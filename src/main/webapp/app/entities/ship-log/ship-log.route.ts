import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ShipLog } from 'app/shared/model/ship-log.model';
import { ShipLogService } from './ship-log.service';
import { ShipLogComponent } from './ship-log.component';
import { ShipLogDetailComponent } from './ship-log-detail.component';
import { ShipLogUpdateComponent } from './ship-log-update.component';
import { ShipLogDeletePopupComponent } from './ship-log-delete-dialog.component';
import { IShipLog } from 'app/shared/model/ship-log.model';

@Injectable({ providedIn: 'root' })
export class ShipLogResolve implements Resolve<IShipLog> {
  constructor(private service: ShipLogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IShipLog> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ShipLog>) => response.ok),
        map((shipLog: HttpResponse<ShipLog>) => shipLog.body)
      );
    }
    return of(new ShipLog());
  }
}

export const shipLogRoute: Routes = [
  {
    path: '',
    component: ShipLogComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.shipLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ShipLogDetailComponent,
    resolve: {
      shipLog: ShipLogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.shipLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ShipLogUpdateComponent,
    resolve: {
      shipLog: ShipLogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.shipLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ShipLogUpdateComponent,
    resolve: {
      shipLog: ShipLogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.shipLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const shipLogPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ShipLogDeletePopupComponent,
    resolve: {
      shipLog: ShipLogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.shipLog.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
