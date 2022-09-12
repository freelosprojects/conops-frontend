import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { INgSelect } from '@core/models/ng-select.model';
import { IResponseList } from '@core/models/response.model';
import { IModel } from '@core/models/vehicle-model.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgSelectService } from 'app/config/service/ng-select.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VehicleModelService } from '../services/vehicle-model.service';
import { ToastService } from '../../../components/toasts/toasts.service';

@Component({
  selector: 'app-vehicle-model-list',
  templateUrl: './vehicle-model-list.component.html',
  styleUrls: ['../../table-styles/ngx-datatable-style.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleModelListComponent implements OnInit, OnDestroy {

  public message: string;
  public model: FormControl;
  public brand: FormControl;
  public ColumnMode = ColumnMode;
  public selectedOption: FormControl;

  public modelList: IResponseList<IModel> = {} as IResponseList<IModel>;
  public itemSelected: IModel | null;

  public modelSubject$: Subject<void> = new Subject();
  public subscription$: Subscription = new Subscription();
  public ngSelectBrand$: Observable<INgSelect[]> = new Observable();

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(
    private _toastService: ToastService,
    private _ngSelectService: NgSelectService,
    private _modelService: VehicleModelService
  ) {
    this.model = new FormControl(null, Validators.required);
    this.brand = new FormControl(null, Validators.required);
    this.selectedOption = new FormControl(5);
    this.initNgSelect();
  }

  get modelIsValid(): boolean {
    return !this.model.invalid && this.model.touched;
  }

  get modelIsInvalid(): boolean {
    return this.model.invalid && this.model.touched;
  }

  get brandIsInvalid(): boolean {
    return this.brand.invalid && this.brand.touched;
  }

  ngOnInit(): void {
    this.getModelList();
  }

  initNgSelect(): void {
    this.ngSelectBrand$ = this._ngSelectService.getBrand();
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
    if (this.brandIsInvalid) return;

    if (!this.itemSelected) {
      this._modelService.createModel({ modelo: this.model.value, id_marca: this.brand.value.value }).subscribe({
        next: (response) => {
          this.message = response.message;
          this.model.reset();
          this.brand.reset();
          this._toastService.showSuccess(this.toast, 'Operación correcta');
          this.modelSubject$.next();
        }
      });
    } else {
      this._modelService.updateModel({ modelo: this.model.value, id_marca: this.brand.value.value }, this.itemSelected.idModel).subscribe({
        next: (response) => {
          this.message = response.message;
          this._toastService.showSuccess(this.toast, 'Operación correcta');
          this.modelSubject$.next();
        }
      });
    }
  }

  edit(item: IModel) {
    this.itemSelected = item;
    this.model.setValue(item.model);
    this.brand.setValue(item.brand.brand);
  }

  deleteModel(id: number) {
    this._modelService.deleteModel(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this.itemSelected = null;
        this._toastService.showSuccess(this.toast, 'Operación exitosa');
        this.modelSubject$.next();
      },
      error: (response) => {
        this.message = response.error.message;
        this._toastService.showError(this.toast, 'Ocurrio un problema');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
