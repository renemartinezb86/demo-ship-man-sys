/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ShipManagementSystemTestModule } from '../../../test.module';
import { ShipLogDeleteDialogComponent } from 'app/entities/ship-log/ship-log-delete-dialog.component';
import { ShipLogService } from 'app/entities/ship-log/ship-log.service';

describe('Component Tests', () => {
  describe('ShipLog Management Delete Component', () => {
    let comp: ShipLogDeleteDialogComponent;
    let fixture: ComponentFixture<ShipLogDeleteDialogComponent>;
    let service: ShipLogService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShipManagementSystemTestModule],
        declarations: [ShipLogDeleteDialogComponent]
      })
        .overrideTemplate(ShipLogDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShipLogDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShipLogService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
