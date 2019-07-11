import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShipLog } from 'app/shared/model/ship-log.model';
import { ShipLogService } from './ship-log.service';

@Component({
  selector: 'jhi-ship-log-delete-dialog',
  templateUrl: './ship-log-delete-dialog.component.html'
})
export class ShipLogDeleteDialogComponent {
  shipLog: IShipLog;

  constructor(protected shipLogService: ShipLogService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.shipLogService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'shipLogListModification',
        content: 'Deleted an shipLog'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ship-log-delete-popup',
  template: ''
})
export class ShipLogDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ shipLog }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ShipLogDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.shipLog = shipLog;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ship-log', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ship-log', { outlets: { popup: null } }]);
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
