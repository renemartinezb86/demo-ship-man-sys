import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IJob, Job } from 'app/shared/model/job.model';
import { JobService } from './job.service';
import { IMarine } from 'app/shared/model/marine.model';
import { MarineService } from 'app/entities/marine';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task';

@Component({
  selector: 'jhi-job-update',
  templateUrl: './job-update.component.html'
})
export class JobUpdateComponent implements OnInit {
  isSaving: boolean;

  marines: IMarine[];

  tasks: ITask[];

  editForm = this.fb.group({
    id: [],
    jobTitle: [],
    specialty: [],
    priority: [],
    marine: [],
    tasks: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected jobService: JobService,
    protected marineService: MarineService,
    protected taskService: TaskService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ job }) => {
      this.updateForm(job);
    });
    this.marineService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMarine[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMarine[]>) => response.body)
      )
      .subscribe((res: IMarine[]) => (this.marines = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.taskService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITask[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITask[]>) => response.body)
      )
      .subscribe((res: ITask[]) => (this.tasks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(job: IJob) {
    this.editForm.patchValue({
      id: job.id,
      jobTitle: job.jobTitle,
      specialty: job.specialty,
      priority: job.priority,
      marine: job.marine,
      tasks: job.tasks
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const job = this.createFromForm();
    if (job.id !== undefined) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  private createFromForm(): IJob {
    return {
      ...new Job(),
      id: this.editForm.get(['id']).value,
      jobTitle: this.editForm.get(['jobTitle']).value,
      specialty: this.editForm.get(['specialty']).value,
      priority: this.editForm.get(['priority']).value,
      marine: this.editForm.get(['marine']).value,
      tasks: this.editForm.get(['tasks']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJob>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackMarineById(index: number, item: IMarine) {
    return item.id;
  }

  trackTaskById(index: number, item: ITask) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
