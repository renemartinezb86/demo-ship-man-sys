import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IShip, Ship } from 'app/shared/model/ship.model';
import { ShipService } from './ship.service';

@Component({
  selector: 'jhi-ship-update',
  templateUrl: './ship-update.component.html'
})
export class ShipUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    shipName: [null, [Validators.required]]
  });

  constructor(protected shipService: ShipService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ship }) => {
      this.updateForm(ship);
    });
  }

  updateForm(ship: IShip) {
    this.editForm.patchValue({
      id: ship.id,
      shipName: ship.shipName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ship = this.createFromForm();
    if (ship.id !== undefined) {
      this.subscribeToSaveResponse(this.shipService.update(ship));
    } else {
      this.subscribeToSaveResponse(this.shipService.create(ship));
    }
  }

  private createFromForm(): IShip {
    return {
      ...new Ship(),
      id: this.editForm.get(['id']).value,
      shipName: this.editForm.get(['shipName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShip>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
