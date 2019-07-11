/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ShipManagementSystemTestModule } from '../../../test.module';
import { ShipDeleteDialogComponent } from 'app/entities/ship/ship-delete-dialog.component';
import { ShipService } from 'app/entities/ship/ship.service';

describe('Component Tests', () => {
  describe('Ship Management Delete Component', () => {
    let comp: ShipDeleteDialogComponent;
    let fixture: ComponentFixture<ShipDeleteDialogComponent>;
    let service: ShipService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShipManagementSystemTestModule],
        declarations: [ShipDeleteDialogComponent]
      })
        .overrideTemplate(ShipDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShipDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShipService);
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
