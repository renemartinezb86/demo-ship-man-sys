import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILocation, Location } from 'app/shared/model/location.model';
import { LocationService } from './location.service';
import { IContinent } from 'app/shared/model/continent.model';
import { ContinentService } from 'app/entities/continent';

@Component({
  selector: 'jhi-location-update',
  templateUrl: './location-update.component.html'
})
export class LocationUpdateComponent implements OnInit {
  isSaving: boolean;

  continents: IContinent[];

  editForm = this.fb.group({
    id: [],
    seaQuadrant: [],
    friendlys: [],
    hostiles: [],
    status: [],
    continent: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected locationService: LocationService,
    protected continentService: ContinentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);
    });
    this.continentService
      .query({ filter: 'location-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IContinent[]>) => mayBeOk.ok),
        map((response: HttpResponse<IContinent[]>) => response.body)
      )
      .subscribe(
        (res: IContinent[]) => {
          if (!this.editForm.get('continent').value || !this.editForm.get('continent').value.id) {
            this.continents = res;
          } else {
            this.continentService
              .find(this.editForm.get('continent').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IContinent>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IContinent>) => subResponse.body)
              )
              .subscribe(
                (subRes: IContinent) => (this.continents = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(location: ILocation) {
    this.editForm.patchValue({
      id: location.id,
      seaQuadrant: location.seaQuadrant,
      friendlys: location.friendlys,
      hostiles: location.hostiles,
      status: location.status,
      continent: location.continent
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  private createFromForm(): ILocation {
    return {
      ...new Location(),
      id: this.editForm.get(['id']).value,
      seaQuadrant: this.editForm.get(['seaQuadrant']).value,
      friendlys: this.editForm.get(['friendlys']).value,
      hostiles: this.editForm.get(['hostiles']).value,
      status: this.editForm.get(['status']).value,
      continent: this.editForm.get(['continent']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocation>>) {
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

  trackContinentById(index: number, item: IContinent) {
    return item.id;
  }
}
