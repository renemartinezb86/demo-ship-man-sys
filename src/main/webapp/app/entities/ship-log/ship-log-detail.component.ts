import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShipLog } from 'app/shared/model/ship-log.model';

@Component({
  selector: 'jhi-ship-log-detail',
  templateUrl: './ship-log-detail.component.html'
})
export class ShipLogDetailComponent implements OnInit {
  shipLog: IShipLog;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ shipLog }) => {
      this.shipLog = shipLog;
    });
  }

  previousState() {
    window.history.back();
  }
}
