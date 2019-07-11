import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IMarine, Marine } from 'app/shared/model/marine.model';
import { MarineService } from './marine.service';
import { IShip } from 'app/shared/model/ship.model';
import { ShipService } from 'app/entities/ship';

@Component({
  selector: 'jhi-marine-update',
  templateUrl: './marine-update.component.html'
})
export class MarineUpdateComponent implements OnInit {
  isSaving: boolean;

  ships: IShip[];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    hireDate: [],
    rank: [],
    ship: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected marineService: MarineService,
    protected shipService: ShipService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ marine }) => {
      this.updateForm(marine);
    });
    this.shipService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IShip[]>) => mayBeOk.ok),
        map((response: HttpResponse<IShip[]>) => response.body)
      )
      .subscribe((res: IShip[]) => (this.ships = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(marine: IMarine) {
    this.editForm.patchValue({
      id: marine.id,
      firstName: marine.firstName,
      lastName: marine.lastName,
      email: marine.email,
      phoneNumber: marine.phoneNumber,
      hireDate: marine.hireDate != null ? marine.hireDate.format(DATE_TIME_FORMAT) : null,
      rank: marine.rank,
      ship: marine.ship
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const marine = this.createFromForm();
    if (marine.id !== undefined) {
      this.subscribeToSaveResponse(this.marineService.update(marine));
    } else {
      this.subscribeToSaveResponse(this.marineService.create(marine));
    }
  }

  private createFromForm(): IMarine {
    return {
      ...new Marine(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      email: this.editForm.get(['email']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      hireDate: this.editForm.get(['hireDate']).value != null ? moment(this.editForm.get(['hireDate']).value, DATE_TIME_FORMAT) : undefined,
      rank: this.editForm.get(['rank']).value,
      ship: this.editForm.get(['ship']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMarine>>) {
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

  trackShipById(index: number, item: IShip) {
    return item.id;
  }
}
