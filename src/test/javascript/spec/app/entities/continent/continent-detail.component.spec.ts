/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShipManagementSystemTestModule } from '../../../test.module';
import { ContinentDetailComponent } from 'app/entities/continent/continent-detail.component';
import { Continent } from 'app/shared/model/continent.model';

describe('Component Tests', () => {
  describe('Continent Management Detail Component', () => {
    let comp: ContinentDetailComponent;
    let fixture: ComponentFixture<ContinentDetailComponent>;
    const route = ({ data: of({ continent: new Continent('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShipManagementSystemTestModule],
        declarations: [ContinentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContinentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContinentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.continent).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
