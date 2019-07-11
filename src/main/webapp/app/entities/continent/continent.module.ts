import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ShipManagementSystemSharedModule } from 'app/shared';
import {
  ContinentComponent,
  ContinentDetailComponent,
  ContinentUpdateComponent,
  ContinentDeletePopupComponent,
  ContinentDeleteDialogComponent,
  continentRoute,
  continentPopupRoute
} from './';

const ENTITY_STATES = [...continentRoute, ...continentPopupRoute];

@NgModule({
  imports: [ShipManagementSystemSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContinentComponent,
    ContinentDetailComponent,
    ContinentUpdateComponent,
    ContinentDeleteDialogComponent,
    ContinentDeletePopupComponent
  ],
  entryComponents: [ContinentComponent, ContinentUpdateComponent, ContinentDeleteDialogComponent, ContinentDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShipManagementSystemContinentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
