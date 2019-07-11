import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ShipManagementSystemSharedModule } from 'app/shared';
import {
  MarineComponent,
  MarineDetailComponent,
  MarineUpdateComponent,
  MarineDeletePopupComponent,
  MarineDeleteDialogComponent,
  marineRoute,
  marinePopupRoute
} from './';

const ENTITY_STATES = [...marineRoute, ...marinePopupRoute];

@NgModule({
  imports: [ShipManagementSystemSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MarineComponent, MarineDetailComponent, MarineUpdateComponent, MarineDeleteDialogComponent, MarineDeletePopupComponent],
  entryComponents: [MarineComponent, MarineUpdateComponent, MarineDeleteDialogComponent, MarineDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShipManagementSystemMarineModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
