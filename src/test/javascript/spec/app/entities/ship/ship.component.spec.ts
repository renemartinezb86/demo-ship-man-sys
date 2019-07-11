/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShipManagementSystemTestModule } from '../../../test.module';
import { ShipComponent } from 'app/entities/ship/ship.component';
import { ShipService } from 'app/entities/ship/ship.service';
import { Ship } from 'app/shared/model/ship.model';

describe('Component Tests', () => {
  describe('Ship Management Component', () => {
    let comp: ShipComponent;
    let fixture: ComponentFixture<ShipComponent>;
    let service: ShipService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShipManagementSystemTestModule],
        declarations: [ShipComponent],
        providers: []
      })
        .overrideTemplate(ShipComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShipComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShipService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ship('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ships[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
