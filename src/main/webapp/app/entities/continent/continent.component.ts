import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContinent } from 'app/shared/model/continent.model';
import { AccountService } from 'app/core';
import { ContinentService } from './continent.service';

@Component({
  selector: 'jhi-continent',
  templateUrl: './continent.component.html'
})
export class ContinentComponent implements OnInit, OnDestroy {
  continents: IContinent[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected continentService: ContinentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.continentService
      .query()
      .pipe(
        filter((res: HttpResponse<IContinent[]>) => res.ok),
        map((res: HttpResponse<IContinent[]>) => res.body)
      )
      .subscribe(
        (res: IContinent[]) => {
          this.continents = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInContinents();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IContinent) {
    return item.id;
  }

  registerChangeInContinents() {
    this.eventSubscriber = this.eventManager.subscribe('continentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
