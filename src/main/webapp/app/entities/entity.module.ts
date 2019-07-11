import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ship',
        loadChildren: './ship/ship.module#ShipManagementSystemShipModule'
      },
      {
        path: 'region',
        loadChildren: './region/region.module#ShipManagementSystemRegionModule'
      },
      {
        path: 'continent',
        loadChildren: './continent/continent.module#ShipManagementSystemContinentModule'
      },
      {
        path: 'location',
        loadChildren: './location/location.module#ShipManagementSystemLocationModule'
      },
      {
        path: 'task',
        loadChildren: './task/task.module#ShipManagementSystemTaskModule'
      },
      {
        path: 'marine',
        loadChildren: './marine/marine.module#ShipManagementSystemMarineModule'
      },
      {
        path: 'job',
        loadChildren: './job/job.module#ShipManagementSystemJobModule'
      },
      {
        path: 'ship-log',
        loadChildren: './ship-log/ship-log.module#ShipManagementSystemShipLogModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShipManagementSystemEntityModule {}
