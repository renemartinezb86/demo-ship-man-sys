import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IShip } from 'app/shared/model/ship.model';
import { AccountService } from 'app/core';
import { ShipService } from './ship.service';

@Component({
  selector: 'jhi-ship',
  templateUrl: './ship.component.html'
})
export class ShipComponent implements OnInit, OnDestroy {
  ships: IShip[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected shipService: ShipService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.shipService
      .query()
      .pipe(
        filter((res: HttpResponse<IShip[]>) => res.ok),
        map((res: HttpResponse<IShip[]>) => res.body)
      )
      .subscribe(
        (res: IShip[]) => {
          this.ships = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInShips();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IShip) {
    return item.id;
  }

  registerChangeInShips() {
    this.eventSubscriber = this.eventManager.subscribe('shipListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
