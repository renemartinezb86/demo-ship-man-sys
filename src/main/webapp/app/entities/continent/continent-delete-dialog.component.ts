import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContinent } from 'app/shared/model/continent.model';
import { ContinentService } from './continent.service';

@Component({
  selector: 'jhi-continent-delete-dialog',
  templateUrl: './continent-delete-dialog.component.html'
})
export class ContinentDeleteDialogComponent {
  continent: IContinent;

  constructor(protected continentService: ContinentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.continentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'continentListModification',
        content: 'Deleted an continent'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-continent-delete-popup',
  template: ''
})
export class ContinentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ continent }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ContinentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.continent = continent;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/continent', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/continent', { outlets: { popup: null } }]);
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
