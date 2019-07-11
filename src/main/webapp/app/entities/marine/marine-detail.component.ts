import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMarine } from 'app/shared/model/marine.model';

@Component({
  selector: 'jhi-marine-detail',
  templateUrl: './marine-detail.component.html'
})
export class MarineDetailComponent implements OnInit {
  marine: IMarine;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ marine }) => {
      this.marine = marine;
    });
  }

  previousState() {
    window.history.back();
  }
}
