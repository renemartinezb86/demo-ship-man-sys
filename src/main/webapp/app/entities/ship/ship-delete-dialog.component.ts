import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShip } from 'app/shared/model/ship.model';
import { ShipService } from './ship.service';

@Component({
  selector: 'jhi-ship-delete-dialog',
  templateUrl: './ship-delete-dialog.component.html'
})
export class ShipDeleteDialogComponent {
  ship: IShip;

  constructor(protected shipService: ShipService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.shipService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'shipListModification',
        content: 'Deleted an ship'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ship-delete-popup',
  template: ''
})
export class ShipDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ship }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ShipDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ship = ship;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ship', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ship', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
