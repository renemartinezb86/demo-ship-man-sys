import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShip } from 'app/shared/model/ship.model';

@Component({
  selector: 'jhi-ship-detail',
  templateUrl: './ship-detail.component.html'
})
export class ShipDetailComponent implements OnInit {
  ship: IShip;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ship }) => {
      this.ship = ship;
    });
  }

  previousState() {
    window.history.back();
  }
}
