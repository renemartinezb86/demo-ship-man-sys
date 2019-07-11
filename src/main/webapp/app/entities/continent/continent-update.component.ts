import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IContinent, Continent } from 'app/shared/model/continent.model';
import { ContinentService } from './continent.service';
import { IRegion } from 'app/shared/model/region.model';
import { RegionService } from 'app/entities/region';

@Component({
  selector: 'jhi-continent-update',
  templateUrl: './continent-update.component.html'
})
export class ContinentUpdateComponent implements OnInit {
  isSaving: boolean;

  regions: IRegion[];

  editForm = this.fb.group({
    id: [],
    continentName: [],
    region: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected continentService: ContinentService,
    protected regionService: RegionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ continent }) => {
      this.updateForm(continent);
    });
    this.regionService
      .query({ filter: 'continent-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IRegion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRegion[]>) => response.body)
      )
      .subscribe(
        (res: IRegion[]) => {
          if (!this.editForm.get('region').value || !this.editForm.get('region').value.id) {
            this.regions = res;
          } else {
            this.regionService
              .find(this.editForm.get('region').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IRegion>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IRegion>) => subResponse.body)
              )
              .subscribe(
                (subRes: IRegion) => (this.regions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(continent: IContinent) {
    this.editForm.patchValue({
      id: continent.id,
      continentName: continent.continentName,
      region: continent.region
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const continent = this.createFromForm();
    if (continent.id !== undefined) {
      this.subscribeToSaveResponse(this.continentService.update(continent));
    } else {
      this.subscribeToSaveResponse(this.continentService.create(continent));
    }
  }

  private createFromForm(): IContinent {
    return {
      ...new Continent(),
      id: this.editForm.get(['id']).value,
      continentName: this.editForm.get(['continentName']).value,
      region: this.editForm.get(['region']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContinent>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRegionById(index: number, item: IRegion) {
    return item.id;
  }
}
