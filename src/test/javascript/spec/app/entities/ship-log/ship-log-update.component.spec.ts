/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ShipManagementSystemTestModule } from '../../../test.module';
import { ShipLogUpdateComponent } from 'app/entities/ship-log/ship-log-update.component';
import { ShipLogService } from 'app/entities/ship-log/ship-log.service';
import { ShipLog } from 'app/shared/model/ship-log.model';

describe('Component Tests', () => {
  describe('ShipLog Management Update Component', () => {
    let comp: ShipLogUpdateComponent;
    let fixture: ComponentFixture<ShipLogUpdateComponent>;
    let service: ShipLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShipManagementSystemTestModule],
        declarations: [ShipLogUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ShipLogUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShipLogUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShipLogService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ShipLog('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ShipLog();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
