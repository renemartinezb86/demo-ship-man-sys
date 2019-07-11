import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContinent } from 'app/shared/model/continent.model';

@Component({
  selector: 'jhi-continent-detail',
  templateUrl: './continent-detail.component.html'
})
export class ContinentDetailComponent implements OnInit {
  continent: IContinent;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ continent }) => {
      this.continent = continent;
    });
  }

  previousState() {
    window.history.back();
  }
}
