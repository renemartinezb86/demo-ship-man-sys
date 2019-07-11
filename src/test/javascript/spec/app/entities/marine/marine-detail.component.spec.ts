/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShipManagementSystemTestModule } from '../../../test.module';
import { MarineDetailComponent } from 'app/entities/marine/marine-detail.component';
import { Marine } from 'app/shared/model/marine.model';

describe('Component Tests', () => {
  describe('Marine Management Detail Component', () => {
    let comp: MarineDetailComponent;
    let fixture: ComponentFixture<MarineDetailComponent>;
    const route = ({ data: of({ marine: new Marine('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShipManagementSystemTestModule],
        declarations: [MarineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MarineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MarineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.marine).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
