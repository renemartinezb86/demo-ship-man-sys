import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ShipManagementSystemSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ShipManagementSystemSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ShipManagementSystemSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShipManagementSystemSharedModule {
  static forRoot() {
    return {
      ngModule: ShipManagementSystemSharedModule
    };
  }
}
