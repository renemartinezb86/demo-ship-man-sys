/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ShipManagementSystemTestModule } from '../../../test.module';
import { MarineUpdateComponent } from 'app/entities/marine/marine-update.component';
import { MarineService } from 'app/entities/marine/marine.service';
import { Marine } from 'app/shared/model/marine.model';

describe('Component Tests', () => {
  describe('Marine Management Update Component', () => {
    let comp: MarineUpdateComponent;
    let fixture: ComponentFixture<MarineUpdateComponent>;
    let service: MarineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShipManagementSystemTestModule],
        declarations: [MarineUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MarineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MarineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MarineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Marine('123');
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
        const entity = new Marine();
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
