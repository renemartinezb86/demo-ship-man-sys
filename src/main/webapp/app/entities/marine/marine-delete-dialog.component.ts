import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMarine } from 'app/shared/model/marine.model';
import { MarineService } from './marine.service';

@Component({
  selector: 'jhi-marine-delete-dialog',
  templateUrl: './marine-delete-dialog.component.html'
})
export class MarineDeleteDialogComponent {
  marine: IMarine;

  constructor(protected marineService: MarineService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.marineService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'marineListModification',
        content: 'Deleted an marine'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-marine-delete-popup',
  template: ''
})
export class MarineDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ marine }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MarineDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.marine = marine;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/marine', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/marine', { outlets: { popup: null } }]);
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
