import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IShipLog, ShipLog } from 'app/shared/model/ship-log.model';
import { ShipLogService } from './ship-log.service';
import { IShip } from 'app/shared/model/ship.model';
import { ShipService } from 'app/entities/ship';
import { IMarine } from 'app/shared/model/marine.model';
import { MarineService } from 'app/entities/marine';

@Component({
  selector: 'jhi-ship-log-update',
  templateUrl: './ship-log-update.component.html'
})
export class ShipLogUpdateComponent implements OnInit {
  isSaving: boolean;

  ships: IShip[];

  marines: IMarine[];

  editForm = this.fb.group({
    id: [],
    datetime: [],
    entrytext: [],
    entrytype: [],
    ship: [],
    marine: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected shipLogService: ShipLogService,
    protected shipService: ShipService,
    protected marineService: MarineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ shipLog }) => {
      this.updateForm(shipLog);
    });
    this.shipService
      .query({ filter: 'shiplog-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IShip[]>) => mayBeOk.ok),
        map((response: HttpResponse<IShip[]>) => response.body)
      )
      .subscribe(
        (res: IShip[]) => {
          if (!this.editForm.get('ship').value || !this.editForm.get('ship').value.id) {
            this.ships = res;
          } else {
            this.shipService
              .find(this.editForm.get('ship').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IShip>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IShip>) => subResponse.body)
              )
              .subscribe(
                (subRes: IShip) => (this.ships = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.marineService
      .query({ filter: 'shiplog-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IMarine[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMarine[]>) => response.body)
      )
      .subscribe(
        (res: IMarine[]) => {
          if (!this.editForm.get('marine').value || !this.editForm.get('marine').value.id) {
            this.marines = res;
          } else {
            this.marineService
              .find(this.editForm.get('marine').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IMarine>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IMarine>) => subResponse.body)
              )
              .subscribe(
                (subRes: IMarine) => (this.marines = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(shipLog: IShipLog) {
    this.editForm.patchValue({
      id: shipLog.id,
      datetime: shipLog.datetime != null ? shipLog.datetime.format(DATE_TIME_FORMAT) : null,
      entrytext: shipLog.entrytext,
      entrytype: shipLog.entrytype,
      ship: shipLog.ship,
      marine: shipLog.marine
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const shipLog = this.createFromForm();
    if (shipLog.id !== undefined) {
      this.subscribeToSaveResponse(this.shipLogService.update(shipLog));
    } else {
      this.subscribeToSaveResponse(this.shipLogService.create(shipLog));
    }
  }

  private createFromForm(): IShipLog {
    return {
      ...new ShipLog(),
      id: this.editForm.get(['id']).value,
      datetime: this.editForm.get(['datetime']).value != null ? moment(this.editForm.get(['datetime']).value, DATE_TIME_FORMAT) : undefined,
      entrytext: this.editForm.get(['entrytext']).value,
      entrytype: this.editForm.get(['entrytype']).value,
      ship: this.editForm.get(['ship']).value,
      marine: this.editForm.get(['marine']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShipLog>>) {
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

  trackMarineById(index: number, item: IMarine) {
    return item.id;
  }
}
