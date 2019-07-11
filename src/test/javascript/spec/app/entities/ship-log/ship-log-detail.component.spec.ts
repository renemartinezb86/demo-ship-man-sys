/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShipManagementSystemTestModule } from '../../../test.module';
import { ShipLogDetailComponent } from 'app/entities/ship-log/ship-log-detail.component';
import { ShipLog } from 'app/shared/model/ship-log.model';

describe('Component Tests', () => {
  describe('ShipLog Management Detail Component', () => {
    let comp: ShipLogDetailComponent;
    let fixture: ComponentFixture<ShipLogDetailComponent>;
    const route = ({ data: of({ shipLog: new ShipLog('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShipManagementSystemTestModule],
        declarations: [ShipLogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ShipLogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShipLogDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shipLog).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
