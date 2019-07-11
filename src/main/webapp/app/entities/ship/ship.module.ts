import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ShipManagementSystemSharedModule } from 'app/shared';
import {
  ShipComponent,
  ShipDetailComponent,
  ShipUpdateComponent,
  ShipDeletePopupComponent,
  ShipDeleteDialogComponent,
  shipRoute,
  shipPopupRoute
} from './';

const ENTITY_STATES = [...shipRoute, ...shipPopupRoute];

@NgModule({
  imports: [ShipManagementSystemSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ShipComponent, ShipDetailComponent, ShipUpdateComponent, ShipDeleteDialogComponent, ShipDeletePopupComponent],
  entryComponents: [ShipComponent, ShipUpdateComponent, ShipDeleteDialogComponent, ShipDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShipManagementSystemShipModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
