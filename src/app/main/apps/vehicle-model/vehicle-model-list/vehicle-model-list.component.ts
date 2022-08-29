import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IResponseList } from '@core/models/response.model';
import { IModel } from '@core/models/vehicle-model.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VehicleModelService } from '../services/vehicle-model.service';

@Component({
  selector: 'app-vehicle-model-list',
  templateUrl: './vehicle-model-list.component.html',
  styleUrls: ['../../table-styles/ngx-datatable-style.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleModelListComponent implements OnInit, OnDestroy {

  public model: FormControl;
  public ColumnMode = ColumnMode;
  public selectedOption: FormControl;

  public modelList: IResponseList<IModel> = {} as IResponseList<IModel>;
  public itemSelected: IModel | null;

  public modelSubject$: Subject<void> = new Subject();
  public subscription$: Subscription = new Subscription();

  constructor(private _modelService: VehicleModelService) {
    this.model = new FormControl(null, Validators.required);
    this.selectedOption = new FormControl(5);
  }

  get modelIsValid(): boolean {
    return !this.model.invalid && this.model.touched;
  }

  get modelIsInvalid(): boolean {
    return this.model.invalid && this.model.touched;
  }

  ngOnInit(): void {
    this.getModelList();
  }

  getModelList(): void {
    this.subscription$.add(
      this.modelSubject$.pipe(
        switchMap(() => this._modelService.getModelList())
      ).subscribe(res => this.modelList = res)
    );
    this.modelSubject$.next();
  }

  submitForm(): void {
    if (this.modelIsInvalid) return;

    this._modelService.createModel({ modelo: this.model.value }).subscribe({
      next: () => this.modelSubject$.next()
    });
  }

  edit(item: IModel) {
    this.itemSelected = item;
    this.model.setValue(item.model);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
