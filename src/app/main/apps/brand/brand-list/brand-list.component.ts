import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IBrand } from '@core/models/brand.model';
import { IResponseList } from '@core/models/response.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BrandService } from '../services/brand.service';
import { ToastService } from '../../../components/toasts/toasts.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandListComponent implements OnInit, OnDestroy {

  public message: string;
  public brand: FormControl;
  public ColumnMode = ColumnMode;
  public selectedOption: FormControl;

  public brandList: IResponseList<IBrand> = {} as IResponseList<IBrand>;
  public itemSelected: IBrand | null;

  public brandSubject$: Subject<void> = new Subject();
  public subscription$: Subscription = new Subscription();

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(
    private _toastService: ToastService,
    private _brandService: BrandService
  ) {
    this.brand = new FormControl(null, Validators.required);
    this.selectedOption = new FormControl(5);
  }

  get brandIsValid(): boolean {
    return !this.brand.invalid && this.brand.touched;
  }

  get brandIsInvalid(): boolean {
    return this.brand.invalid && this.brand.touched;
  }

  ngOnInit(): void {
    this.getBrandList();
  }

  getBrandList(): void {
    this.subscription$.add(
      this.brandSubject$.pipe(
        switchMap(() => this._brandService.getBrandList())
      ).subscribe(res => this.brandList = res)
    );
    this.brandSubject$.next();
  }

  submitForm(): void {
    if (this.brandIsInvalid) return;

    if (!this.itemSelected) {
      this._brandService.createBrand({ marca: this.brand.value }).subscribe({
        next: (response) => {
          this.message = response.message;
          this.brand.reset();
          this._toastService.showSuccess(this.toast, 'Operación correcta');
          this.brandSubject$.next();
        }
      });
    } else {
      this._brandService.updateBrand({ marca: this.brand.value }, this.itemSelected.idBrand).subscribe({
        next: (response) => {
          this.message = response.message;
          this.brand.reset();
          this._toastService.showSuccess(this.toast, 'Operación correcta');
          this.brandSubject$.next();
        }
      });
    }
  }

  edit(item: IBrand) {
    this.itemSelected = item;
    this.brand.setValue(item.brand);
  }

  deleteBrand(id: number): void {
    this._brandService.deleteBrand(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this.itemSelected = null;
        this._toastService.showSuccess(this.toast, 'Operación exitosa');
        this.brandSubject$.next();
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
