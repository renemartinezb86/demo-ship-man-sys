/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ShipManagementSystemTestModule } from '../../../test.module';
import { ContinentDeleteDialogComponent } from 'app/entities/continent/continent-delete-dialog.component';
import { ContinentService } from 'app/entities/continent/continent.service';

describe('Component Tests', () => {
  describe('Continent Management Delete Component', () => {
    let comp: ContinentDeleteDialogComponent;
    let fixture: ComponentFixture<ContinentDeleteDialogComponent>;
    let service: ContinentService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShipManagementSystemTestModule],
        declarations: [ContinentDeleteDialogComponent]
      })
        .overrideTemplate(ContinentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContinentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContinentService);
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
