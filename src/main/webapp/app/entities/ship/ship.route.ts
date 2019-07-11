import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ship } from 'app/shared/model/ship.model';
import { ShipService } from './ship.service';
import { ShipComponent } from './ship.component';
import { ShipDetailComponent } from './ship-detail.component';
import { ShipUpdateComponent } from './ship-update.component';
import { ShipDeletePopupComponent } from './ship-delete-dialog.component';
import { IShip } from 'app/shared/model/ship.model';

@Injectable({ providedIn: 'root' })
export class ShipResolve implements Resolve<IShip> {
  constructor(private service: ShipService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IShip> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Ship>) => response.ok),
        map((ship: HttpResponse<Ship>) => ship.body)
      );
    }
    return of(new Ship());
  }
}

export const shipRoute: Routes = [
  {
    path: '',
    component: ShipComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.ship.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ShipDetailComponent,
    resolve: {
      ship: ShipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.ship.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ShipUpdateComponent,
    resolve: {
      ship: ShipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.ship.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ShipUpdateComponent,
    resolve: {
      ship: ShipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.ship.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const shipPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ShipDeletePopupComponent,
    resolve: {
      ship: ShipResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'shipManagementSystemApp.ship.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
